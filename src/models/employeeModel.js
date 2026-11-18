export default class EmployeeModel {
  constructor(taxId, name, role, salary, employeeStatus) {
    this.CPF = taxId
    this.nome = name
    this.cargo = role
    this.salario = salary
    this.statusFuncionario = employeeStatus
  }
}
