import UsersDao from '../daos/usersDao.js'

export async function checkUserExists(request, response, next) {
  const { email } = request.body
  try {
    const { rows: users } = await UsersDao.findUserByEmail(email)
    if (users.length > 0) return response.status(409).json({ message: 'Não é possível cadastrar um usuário com email repetido' })
    return next()
  } catch (error) { return response.status(400).json({ erro: error.message }) }
}

export function validateUser(request, response, next) {
  if (!request.body.nome) return response.status(400).json({ error: 'Nome é obrigatório' })
  if (!isValidEmail(request.body.email)) return response.status(400).json({ erro: 'Email inválido' })
  if (request.body.senha.length < 6) return response.status(400).json({ erro: 'Senha deve ter no mínimo 6 caracteres' })
  return next()
}

const isValidEmail = email => /^\S+@\S+\.\S+$/.test(email)
