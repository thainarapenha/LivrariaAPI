import bcrypt from 'bcrypt'
import UsersDao from '../daos/usersDao.js'
import UserModel from '../models/userModel.js'

const listUsers = async (_request, response) => {
  try {
    const { rows: users } = await UsersDao.listUsers()
    if (!users[0]) return response.status(404).json({ message: 'Nenhum usuário cadastrado' })
    users.forEach(user => (user.senha = undefined))
    response.json(users)
  } catch (error) { response.status(400).json({ error: error.message }) }
}
const getUserById = async (request, response) => {
  try {
    const { rows: user } = await UsersDao.findUserById(request.params.id)
    if (!user[0]) return response.status(404).json({ message: 'Usuário não existe' })
    user[0].senha = undefined
    response.json(user)
  } catch (error) { response.status(500).json({ error: error.message }) }
}
const registerUser = async (request, response) => {
  const { nome: name, email, senha: password } = request.body
  const user = new UserModel(name, email, bcrypt.hashSync(password, 10))
  try {
    await UsersDao.createUser(user)
    user.senha = undefined
    return response.status(201).json({ usuario: user, message: 'Usuário cadastrado com sucesso' })
  }
  catch (error) { return response.status(500).json({ error: error.message }) }
}
const loginUser = async (request, response) => {
  const { email, senha: password } = request.body
  try {
    const { rows: users } = await UsersDao.findUserByEmail(email)
    if (!users[0]) return response.status(403).json({ message: 'Usuário não existe' })
    if (!bcrypt.compareSync(String(password), users[0].senha)) return response.status(403).json({ message: 'Usuário não autorizado' })
    users[0].senha = undefined
    return response.json({ usuario: users[0], message: 'Usuário autorizado' })
  } catch (error) { response.status(500).json({ error: error.message }) }
}
const updateUser = async (request, response) => {
  const { id } = request.params
  const { nome: name, email, senha: password } = request.body
  const user = new UserModel(name, email, bcrypt.hashSync(password, 10))
  const { rows: users } = await UsersDao.findUserById(id)
  if (!users[0]) return response.status(404).json({ message: 'Usuário não existe' })
  try {
    await UsersDao.updateUser(id, user)
    response.json({ message: 'Usuário atualizado com sucesso' })
  }
  catch (error) { response.status(500).json({ error: error.message }) }
}
const deleteUser = async (request, response) => {
  const { id } = request.params
  const { rows: users } = await UsersDao.findUserById(id)
  if (!users[0]) return response.status(404).json({ message: 'Usuário não existe' })
  try {
    await UsersDao.deleteUser(id)
    response.json({ message: 'Usuário deletado do banco de dados' })
  }
  catch (error) { response.status(500).json({ error: error.message }) }
}
export default { listUsers, getUserById, registerUser, loginUser, updateUser, deleteUser }
