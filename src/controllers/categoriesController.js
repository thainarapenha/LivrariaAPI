import { listCategories } from '../repositories/categoriesRepository.js'

export const getCategories = async (_request, response) => {
  try {
    const { rows } = await listCategories()

    return response.status(200).json(rows)
  } catch (error) {
    console.error('Failed to list categories:', error)
    return response.status(500).json({ error: 'Internal server error' })
  }
}
