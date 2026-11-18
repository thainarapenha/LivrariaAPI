import EmployeesDao from '../daos/employeesDao.js'
import EmployeeModel from '../models/employeeModel.js'

const listEmployees = async (_request, response) => {
  try {
    const { rows: employees } = await EmployeesDao.listEmployees()
    if (!employees[0]) response.status(404).send('Nenhum funcionário encontrado')
    response.json(employees)
  } catch (error) { response.status(400).json({ error: error.message }) }
}

const getEmployeeById = async (request, response) => {
  try {
    const { rows: employee } = await EmployeesDao.findEmployeeById(request.params.id)
    if (!employee[0]) response.status(404).json({ erro: 'Funcionário não encontrado' })
    response.json(employee)
  } catch (error) { response.status(400).json({ error: error.message }) }
}

const createEmployee = async (request, response) => {
  const { CPF: taxId, nome: name, cargo: role, salario: salary, statusFuncionario: employeeStatus } = request.body
  try {
    await EmployeesDao.createEmployee(new EmployeeModel(taxId, name, role, salary, employeeStatus))
    response.status(201).json({ message: 'Funcionário adicionado com sucesso' })
  } catch (error) { response.status(400).json({ error }) }
}

const updateEmployee = async (request, response) => {
  const { id } = request.params
  const { rows: employee } = await EmployeesDao.findEmployeeById(id)
  if (!employee[0]) return response.status(404).json({ error: 'Funcionário não encontrado' })
  const { CPF: taxId, nome: name, cargo: role, salario: salary, statusFuncionario: employeeStatus } = request.body
  try {
    await EmployeesDao.updateEmployee(id, new EmployeeModel(taxId, name, role, salary, employeeStatus))
    response.status(200).json('Funcinário atualizado com sucesso')
  } catch (error) { response.status(400).json({ error: error.message }) }
}

const deleteEmployee = async (request, response) => {
  const { id } = request.params
  const { rows: employee } = await EmployeesDao.findEmployeeById(id)
  if (!employee[0]) return response.status(404).json('Funcionário não existe')
  try {
    await EmployeesDao.deleteEmployee(id)
    response.status(200).json('Funcionário deletado com sucesso')
  } catch (error) { response.status(400).json({ error: error.message }) }
}

export default { listEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee }
