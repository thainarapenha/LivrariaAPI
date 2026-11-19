import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import {
  createCustomer,
  findCustomerByEmail,
  findCustomerById,
  updateCustomerById,
} from '../repositories/customersRepository.js'

const passwordSaltRounds = 10
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const expirationPattern = /^[1-9]\d*(ms|s|m|h|d|w|y)$/

export class ValidationError extends Error {}

export class DuplicateEmailError extends Error {}

export class AuthenticationConfigurationError extends Error {}

const getJwtConfiguration = () => {
  const secret = process.env.JWT_SECRET
  const expiresIn = process.env.JWT_EXPIRES_IN || '1d'

  if (typeof secret !== 'string' || !secret.trim()) {
    throw new AuthenticationConfigurationError(
      'JWT_SECRET is not configured.',
    )
  }

  if (process.env.NODE_ENV === 'production' && secret.length < 32) {
    throw new AuthenticationConfigurationError(
      'JWT_SECRET is too weak for production.',
    )
  }

  if (!expirationPattern.test(expiresIn)) {
    throw new AuthenticationConfigurationError(
      'JWT_EXPIRES_IN is invalid.',
    )
  }

  return { secret, expiresIn }
}

export const assertJwtConfiguration = () => {
  getJwtConfiguration()
}

const normalizeEmail = (email) => email.trim().toLowerCase()

const validateRegistrationInput = (input = {}) => {
  const { name, email, password } = input || {}

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    throw new ValidationError('Name, email and password are required.')
  }

  const normalizedName = name.trim()
  const normalizedEmail = normalizeEmail(email)

  if (!normalizedName || !normalizedEmail || !password) {
    throw new ValidationError('Name, email and password are required.')
  }

  if (normalizedName.length > 150 || normalizedEmail.length > 255) {
    throw new ValidationError('Name or email is too long.')
  }

  if (!emailPattern.test(normalizedEmail)) {
    throw new ValidationError('Invalid email.')
  }

  if (password.length < 6) {
    throw new ValidationError('Password must contain at least 6 characters.')
  }

  if (password.length > 72) {
    throw new ValidationError('Password must contain at most 72 characters.')
  }

  return {
    name: normalizedName,
    email: normalizedEmail,
    password,
  }
}

const validateLoginInput = (input = {}) => {
  const { email, password } = input || {}

  if (typeof email !== 'string' || typeof password !== 'string') {
    throw new ValidationError('Email and password are required.')
  }

  const normalizedEmail = normalizeEmail(email)

  if (!normalizedEmail || !password) {
    throw new ValidationError('Email and password are required.')
  }

  return { email: normalizedEmail, password }
}

export const registerCustomer = async (input) => {
  const { name, email, password } = validateRegistrationInput(input)
  const passwordHash = await bcrypt.hash(password, passwordSaltRounds)

  try {
    const { rows } = await createCustomer({ name, email, passwordHash })

    return rows[0]
  } catch (error) {
    if (error.code === '23505') {
      throw new DuplicateEmailError('Email is already registered.')
    }

    throw error
  }
}

export const authenticateCustomer = async (input) => {
  const { email, password } = validateLoginInput(input)
  const { secret, expiresIn } = getJwtConfiguration()
  const { rows } = await findCustomerByEmail(email)

  if (rows.length === 0) {
    return null
  }

  const customer = rows[0]
  const passwordMatches = await bcrypt.compare(password, customer.password_hash)

  if (!passwordMatches) {
    return null
  }

  const token = jwt.sign(
    { sub: String(customer.id) },
    secret,
    { expiresIn },
  )

  return {
    token,
    customer: {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      created_at: customer.created_at,
      updated_at: customer.updated_at,
    },
  }
}

export const getCustomerById = async (id) => {
  const { rows } = await findCustomerById(id)

  return rows[0] || null
}

export const updateCustomerProfile = async (id, input = {}) => {
  if (!Number.isSafeInteger(Number(id)) || Number(id) <= 0) {
    throw new ValidationError('Invalid customer.')
  }

  const allowedFields = ['name', 'email', 'password']
  const unknownFields = Object.keys(input).filter(field => !allowedFields.includes(field))
  if (unknownFields.length > 0) {
    throw new ValidationError('Only name, email and password can be updated.')
  }

  if (!allowedFields.some(field => Object.prototype.hasOwnProperty.call(input, field))) {
    throw new ValidationError('At least one profile field is required.')
  }

  const current = await getCustomerById(Number(id))
  if (!current) return null

  const name = input.name === undefined ? current.name : input.name
  const email = input.email === undefined ? current.email : input.email

  if (typeof name !== 'string' || !name.trim()) {
    throw new ValidationError('Name must be a non-empty string.')
  }

  if (name.trim().length > 150) {
    throw new ValidationError('Name is too long.')
  }

  if (typeof email !== 'string' || !emailPattern.test(email.trim().toLowerCase())) {
    throw new ValidationError('Invalid email.')
  }

  if (email.trim().length > 255) {
    throw new ValidationError('Email is too long.')
  }

  let passwordHash = null
  if (input.password !== undefined) {
    if (typeof input.password !== 'string' || input.password.length < 6) {
      throw new ValidationError('Password must contain at least 6 characters.')
    }

    if (input.password.length > 72) {
      throw new ValidationError('Password must contain at most 72 characters.')
    }

    passwordHash = await bcrypt.hash(input.password, passwordSaltRounds)
  }

  try {
    const { rows } = await updateCustomerById(Number(id), {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
    })

    return rows[0] || null
  } catch (error) {
    if (error.code === '23505') {
      throw new DuplicateEmailError('Email is already registered.')
    }

    throw error
  }
}

export const verifyAccessToken = (token) => {
  const { secret } = getJwtConfiguration()
  const payload = jwt.verify(token, secret)
  const customerId = Number(payload.sub)

  if (!Number.isSafeInteger(customerId) || customerId <= 0) {
    throw new jwt.JsonWebTokenError('Invalid subject.')
  }

  return customerId
}
