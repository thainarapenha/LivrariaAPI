import { Router } from 'express'
import EmployeesController from '../controllers/employeesController.js'
import { validateEmployee } from '../middlewares/employeeValidation.js'

const employeesRouter = Router()
employeesRouter.get('/funcionarios', EmployeesController.listEmployees)
employeesRouter.get('/funcionarios/:id', EmployeesController.getEmployeeById)
employeesRouter.post('/funcionarios', validateEmployee, EmployeesController.createEmployee)
employeesRouter.patch('/funcionarios/:id', validateEmployee, EmployeesController.updateEmployee)
employeesRouter.delete('/funcionarios/:id', EmployeesController.deleteEmployee)
export { employeesRouter }
