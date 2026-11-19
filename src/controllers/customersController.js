import {
  authenticateCustomer,
  AuthenticationConfigurationError,
  DuplicateEmailError,
  getCustomerById,
  registerCustomer,
  updateCustomerProfile,
  ValidationError,
} from '../services/customersService.js'

export const register = async (request, response) => {
  try {
    const customer = await registerCustomer(request.body)

    return response.status(201).json(customer)
  } catch (error) {
    if (error instanceof ValidationError) {
      return response.status(400).json({ error: error.message })
    }

    if (error instanceof DuplicateEmailError) {
      return response.status(409).json({ error: 'Email is already registered.' })
    }

    return response.status(500).json({ error: 'Internal server error' })
  }
}

export const login = async (request, response) => {
  try {
    const authentication = await authenticateCustomer(request.body)

    if (!authentication) {
      return response.status(401).json({ error: 'Invalid credentials' })
    }

    return response.status(200).json(authentication)
  } catch (error) {
    if (error instanceof ValidationError) {
      return response.status(400).json({ error: error.message })
    }

    if (error instanceof AuthenticationConfigurationError) {
      return response.status(500).json({ error: 'Internal server error' })
    }

    return response.status(500).json({ error: 'Internal server error' })
  }
}

export const getCurrentCustomer = async (request, response) => {
  try {
    const customer = await getCustomerById(request.authenticatedCustomerId)

    if (!customer) {
      return response.status(404).json({ error: 'Customer not found' })
    }

    return response.status(200).json(customer)
  } catch (error) {
    return response.status(500).json({ error: 'Internal server error' })
  }
}

export const updateCurrentCustomer = async (request, response) => {
  try {
    const customer = await updateCustomerProfile(
      request.authenticatedCustomerId,
      request.body,
    )

    if (!customer) {
      return response.status(404).json({ error: 'Customer not found' })
    }

    return response.status(200).json(customer)
  } catch (error) {
    if (error instanceof ValidationError) {
      return response.status(400).json({ error: error.message })
    }

    if (error instanceof DuplicateEmailError) {
      return response.status(409).json({ error: 'Email is already registered.' })
    }

    return response.status(500).json({ error: 'Internal server error' })
  }
}
