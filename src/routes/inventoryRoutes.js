import { Router } from 'express'
import InventoryController from '../controllers/inventoryController.js'

const inventoryRouter = Router()
inventoryRouter.get('/estoque', InventoryController.listInventory)
inventoryRouter.get('/estoque/:id', InventoryController.getInventoryById)
inventoryRouter.post('/estoque', InventoryController.createInventory)
inventoryRouter.patch('/estoque/:id', InventoryController.updateInventory)
inventoryRouter.delete('/estoque/:id', InventoryController.deleteInventory)
export { inventoryRouter }
