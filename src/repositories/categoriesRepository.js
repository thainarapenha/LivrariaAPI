import { database } from '../infra/database.js'

const categoryColumns = `
  id,
  name,
  slug
`

const uniqueSlugs = slugs => [...new Set(slugs)]

export const listCategories = async () => {
  const query = `
    SELECT ${categoryColumns}
    FROM categories
    ORDER BY name ASC
  `

  return database.query(query)
}

export const findCategoriesBySlugs = async slugs => {
  const query = `
    SELECT ${categoryColumns}
    FROM categories
    WHERE slug = ANY($1::text[])
    ORDER BY name ASC
  `

  return database.query(query, [uniqueSlugs(slugs)])
}

export const categoriesExist = async slugs => {
  const requestedSlugs = uniqueSlugs(slugs)

  if (requestedSlugs.length === 0) return true

  const query = `
    SELECT COUNT(*)::integer AS count
    FROM categories
    WHERE slug = ANY($1::text[])
  `

  const { rows } = await database.query(query, [requestedSlugs])

  return rows[0].count === requestedSlugs.length
}
