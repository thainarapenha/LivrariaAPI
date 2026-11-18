import { usersRouter } from './usersRoutes.js'
import { employeesRouter } from './employeesRoutes.js'
import { inventoryRouter } from './inventoryRoutes.js'
import { legacyBooksRouter } from './legacyBooksRoutes.js'
import { booksRouter } from './booksRoutes.js'
import { customersRouter } from './customersRoutes.js'
import { ordersRouter } from './ordersRoutes.js'

export const registerRoutes = app => {
  app.use(usersRouter)
  app.use(booksRouter)
  app.use(customersRouter)
  app.use(ordersRouter)
  app.use(employeesRouter)
  app.use(inventoryRouter)
  app.use(legacyBooksRouter)
}
