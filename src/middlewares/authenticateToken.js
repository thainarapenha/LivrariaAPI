import {
  AuthenticationConfigurationError,
  verifyAccessToken,
} from '../services/customersService.js'

export const authenticateToken = (request, response, next) => {
  const authorization = request.get('Authorization')

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return response.status(401).json({ error: 'Authentication required' })
  }

  const token = authorization.slice(7).trim()

  if (!token) {
    return response.status(401).json({ error: 'Authentication required' })
  }

  try {
    request.authenticatedCustomerId = verifyAccessToken(token)
    return next()
  } catch (error) {
    if (error instanceof AuthenticationConfigurationError) {
      return response.status(500).json({ error: 'Internal server error' })
    }

    return response.status(401).json({ error: 'Invalid or expired token' })
  }
}
