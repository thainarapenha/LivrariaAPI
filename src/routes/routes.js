import { booksRouter } from './booksRoutes.js'
import { customersRouter } from './customersRoutes.js'
import { ordersRouter } from './ordersRoutes.js'
import { categoriesRouter } from './categoriesRoutes.js'

export const registerRoutes = app => {
  app.use(booksRouter)
  app.use(categoriesRouter)
  app.use(customersRouter)
  app.use(ordersRouter)
}
