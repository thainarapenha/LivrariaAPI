const legacyFields = [
  'titulo',
  'descricao',
  'categoria',
  'url_img',
  'preco',
  'total_paginas',
  'ano_publicacao',
  'autor',
]

const catalogFields = [
  'id',
  'title',
  'author',
  'publisher',
  'isbn',
  'description',
  'imageUrl',
  'price',
  'stockQuantity',
  'isActive',
  'isPreorder',
  'releaseDate',
  'isNewRelease',
  'promotionPrice',
  'promotionStartsAt',
  'promotionEndsAt',
  'categories',
]

const hasOwn = (value, key) => Object.prototype.hasOwnProperty.call(value, key)

const isLegacyPayload = body =>
  legacyFields.some(field => hasOwn(body, field))

const isValidNumber = value =>
  typeof value === 'number' && Number.isFinite(value)

const isValidDate = value => {
  if (typeof value !== 'string' || !value.trim()) return false
  return !Number.isNaN(Date.parse(value))
}

const isValidSlug = slug =>
  typeof slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)

const sendValidationError = (response, message) =>
  response.status(400).json({ error: message })

const sendLegacyValidationError = (response, message) =>
  response.status(400).json({ erro: message })

const validateLegacyBook = (body, response) => {
  if (Object.keys(body).length < legacyFields.length) {
    return sendLegacyValidationError(
      response,
      'Insira todas as informações necessárias',
    )
  }

  for (const field of Object.keys(body)) {
    if (!body[field]) {
      return sendLegacyValidationError(
        response,
        `${field} é um campo obrigatório`,
      )
    }
  }

  return null
}

const validateRequiredFields = (body, isPatch, response) => {
  if (isPatch) return null

  for (const field of ['title', 'author']) {
    if (!hasOwn(body, field) ||
      typeof body[field] !== 'string' ||
      !body[field].trim()) {
      return sendValidationError(response, `${field} é obrigatório`)
    }
  }

  return null
}

const validateNumericFields = (body, response) => {
  if (hasOwn(body, 'price') &&
    (!isValidNumber(body.price) || body.price <= 0)) {
    return sendValidationError(response, 'price deve ser um número maior que zero')
  }

  if (hasOwn(body, 'stockQuantity') &&
    (!isValidNumber(body.stockQuantity) ||
      !Number.isInteger(body.stockQuantity) ||
      body.stockQuantity < 0)) {
    return sendValidationError(
      response,
      'stockQuantity deve ser um inteiro maior ou igual a zero',
    )
  }

  if (hasOwn(body, 'promotionPrice') && body.promotionPrice !== null &&
    (!isValidNumber(body.promotionPrice) || body.promotionPrice <= 0)) {
    return sendValidationError(
      response,
      'promotionPrice deve ser maior que zero',
    )
  }

  if (hasOwn(body, 'promotionPrice') &&
    body.promotionPrice !== null &&
    hasOwn(body, 'price') &&
    body.price !== null &&
    isValidNumber(body.price) &&
    body.promotionPrice >= body.price) {
    return sendValidationError(
      response,
      'promotionPrice deve ser menor que price',
    )
  }

  return null
}

const validateBooleanFields = (body, response) => {
  for (const field of ['isActive', 'isPreorder', 'isNewRelease']) {
    if (hasOwn(body, field) && typeof body[field] !== 'boolean') {
      return sendValidationError(response, `${field} deve ser booleano`)
    }
  }

  return null
}

const validateDateFields = (body, response) => {
  if (hasOwn(body, 'releaseDate') && body.releaseDate !== null &&
    !isValidDate(body.releaseDate)) {
    return sendValidationError(response, 'releaseDate deve ser uma data válida ou nula')
  }

  for (const field of ['promotionStartsAt', 'promotionEndsAt']) {
    if (hasOwn(body, field) && body[field] !== null &&
      !isValidDate(body[field])) {
      return sendValidationError(response, `${field} deve ser uma data válida ou nula`)
    }
  }

  if (hasOwn(body, 'promotionStartsAt') &&
    hasOwn(body, 'promotionEndsAt') &&
    body.promotionStartsAt !== null &&
    body.promotionEndsAt !== null &&
    isValidDate(body.promotionStartsAt) &&
    isValidDate(body.promotionEndsAt) &&
    new Date(body.promotionEndsAt) <= new Date(body.promotionStartsAt)) {
    return sendValidationError(
      response,
      'promotionEndsAt deve ser posterior a promotionStartsAt',
    )
  }

  return null
}

const validateCategories = (body, response) => {
  if (!hasOwn(body, 'categories')) return null

  if (!Array.isArray(body.categories) ||
    body.categories.some(category => !isValidSlug(category)) ||
    new Set(body.categories).size !== body.categories.length) {
    return sendValidationError(
      response,
      'categories deve ser um array de slugs válidos sem duplicatas',
    )
  }

  return null
}

const validatePromotionCompleteness = (body, isPatch, response) => {
  const promotionFields = [
    'promotionPrice',
    'promotionStartsAt',
    'promotionEndsAt',
  ]
  const suppliedFields = promotionFields.filter(field => hasOwn(body, field))

  if (isPatch || suppliedFields.length === 0) return null

  const hasPromotion = promotionFields.some(
    field => body[field] !== undefined && body[field] !== null,
  )

  if (hasPromotion && promotionFields.some(field => body[field] === undefined || body[field] === null)) {
    return sendValidationError(
      response,
      'promotionPrice, promotionStartsAt e promotionEndsAt devem ser informados juntos',
    )
  }

  return null
}

export default function validateBook(request, response, next) {
  const body = request.body || {}

  if (isLegacyPayload(body)) {
    const legacyError = validateLegacyBook(body, response)
    if (legacyError) return legacyError
    return next()
  }

  const isPatch = request.method === 'PATCH'
  const supportedFields = Object.keys(body).filter(field =>
    catalogFields.includes(field),
  )

  if (supportedFields.length === 0) {
    return sendValidationError(response, 'Nenhum campo de livro foi informado')
  }

  return validateRequiredFields(body, isPatch, response) ||
    validateNumericFields(body, response) ||
    validateBooleanFields(body, response) ||
    validateDateFields(body, response) ||
    validateCategories(body, response) ||
    validatePromotionCompleteness(body, isPatch, response) ||
    next()
}
