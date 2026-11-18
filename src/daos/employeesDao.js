import { database } from '../infra/database.js'

export default class EmployeesDao {
  static listEmployees() {
    return database.query('SELECT * FROM funcionarios')
  }

  static findEmployeeById(id) {
    return database.query('SELECT * FROM funcionarios WHERE id = $1', [id])
  }

  static createEmployee(employeeData) {
    const query =
      'INSERT INTO funcionarios (CPF, nome, cargo, salario, statusFuncionario) VALUES ($1, $2, $3, $4, $5)'

    return database.query(query, Object.values(employeeData))
  }

  static updateEmployee(id, employeeData) {
    const query =
      'UPDATE funcionarios SET CPF = $1, nome = $2, cargo = $3, salario = $4, statusFuncionario = $5 WHERE id = $6'
    console.log(Object.values(employeeData))
    return database.query(query, [...Object.values(employeeData), id])
  }

  static deleteEmployee(id) {
    return database.query('DELETE FROM funcionarios WHERE id = $1', [id])
  }
}
