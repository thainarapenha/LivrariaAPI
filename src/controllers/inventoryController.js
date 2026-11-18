import InventoryDao from '../daos/inventoryDao.js'
import InventoryModel from '../models/inventoryModel.js'

const listInventory = async (_request, response) => {
  try {
    const { rows: inventory } = await InventoryDao.listInventory()
    if (!inventory[0]) response.status(404).send('Nenhum estoque encontrado')
    response.json(inventory)
  } catch (error) { response.status(400).json({ error: error.message }) }
}

const getInventoryById = async (request, response) => {
  try {
    const { rows: inventory } = await InventoryDao.findInventoryById(request.params.id)
    if (!inventory[0]) response.status(404).json({ erro: 'Não encontrado' })
    response.json(inventory)
  } catch (error) { response.status(400).json({ error: error.message }) }
}

const createInventory = async (request, response) => {
  const { nome_fornecedor: supplierName, CNPJ: taxId, qnt_livros: bookQuantity, lote: batch, nome_obra: workName, preco_lote: batchPrice } = request.body
  try {
    await InventoryDao.createInventory(new InventoryModel(supplierName, taxId, bookQuantity, batch, workName, batchPrice))
    response.status(201).json({ message: 'Informações adicionadas ao estoque com sucesso' })
  } catch (error) { response.status(400).json({ error }) }
}

const updateInventory = async (request, response) => {
  const { id } = request.params
  const { rows: existingInventory } = await InventoryDao.findInventoryById(id)
  if (!existingInventory[0]) return response.status(404).json({ error: 'O estoque desejado não encontrado' })
  const { nome_fornecedor: supplierName, CNPJ: taxId, qnt_livros: bookQuantity, lote: batch, nome_obra: workName, preco_lote: batchPrice } = request.body
  try {
    await InventoryDao.updateInventory(id, new InventoryModel(supplierName, taxId, bookQuantity, batch, workName, batchPrice))
    response.status(200).json('Estoque atualizado com sucesso')
  } catch (error) { response.status(400).json({ error: error.message }) }
}

const deleteInventory = async (request, response) => {
  const { id } = request.params
  const { rows: existingInventory } = await InventoryDao.findInventoryById(id)
  if (!existingInventory[0]) return response.status(404).json({ error: 'O estoque desejado não encontrado' })
  try {
    await InventoryDao.deleteInventory(id)
    response.status(200).json('Informações especificadas foram deletadas com sucesso')
  } catch (error) { response.status(400).json({ error: error.message }) }
}

export default { listInventory, getInventoryById, createInventory, updateInventory, deleteInventory }
