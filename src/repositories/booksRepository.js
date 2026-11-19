import { database } from '../infra/database.js'

const effectivePriceExpression = `
  CASE
    WHEN b.promotion_price IS NOT NULL
      AND CURRENT_TIMESTAMP >= b.promotion_starts_at
      AND CURRENT_TIMESTAMP <= b.promotion_ends_at
    THEN b.promotion_price
    ELSE b.price
  END
`

const promotionActiveExpression = `
  b.promotion_price IS NOT NULL
    AND CURRENT_TIMESTAMP >= b.promotion_starts_at
    AND CURRENT_TIMESTAMP <= b.promotion_ends_at
`

const catalogQuery = `
  SELECT
    b.id,
    b.title,
    b.author,
    b.publisher,
    b.isbn,
    b.description,
    b.image_url,
    b.price,
    b.stock_quantity,
    b.is_active,
    b.created_at,
    b.updated_at,
    b.is_preorder,
    b.release_date,
    b.is_new_release,
    b.promotion_price,
    b.promotion_starts_at,
    b.promotion_ends_at,
    b.promotion_price AS "promotionPrice",
    ${effectivePriceExpression} AS "effectivePrice",
    ${promotionActiveExpression} AS "promotionActive",
    COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', category.id,
            'name', category.name,
            'slug', category.slug
          )
          ORDER BY category.name ASC
        )
        FROM book_categories AS book_category
        INNER JOIN categories AS category
          ON category.id = book_category.category_id
        WHERE book_category.book_id = b.id
      ),
      '[]'::jsonb
    ) AS categories
  FROM books AS b
`

const isProvided = value => value !== undefined && value !== null && value !== ''

const normalizeBoolean = value => {
  if (value === true || value === 'true') return true
  if (value === false || value === 'false') return false
  return null
}

const buildCatalogQuery = (filters = {}, additionalConditions = []) => {
  const conditions = ['is_active = TRUE']
  const parameters = []

  if (Array.isArray(filters.categories) && filters.categories.length > 0) {
    parameters.push([...new Set(filters.categories)])
    conditions.push(`
      EXISTS (
        SELECT 1
        FROM book_categories AS filter_book_category
        INNER JOIN categories AS filter_category
          ON filter_category.id = filter_book_category.category_id
        WHERE filter_book_category.book_id = catalog_book.id
          AND filter_category.slug = ANY($${parameters.length}::text[])
      )
    `)
  }

  if (isProvided(filters.minPrice)) {
    parameters.push(filters.minPrice)
    conditions.push(`"effectivePrice" >= $${parameters.length}`)
  }

  if (isProvided(filters.maxPrice)) {
    parameters.push(filters.maxPrice)
    conditions.push(`"effectivePrice" <= $${parameters.length}`)
  }

  const preorder = normalizeBoolean(filters.preorder)
  if (preorder !== null) {
    parameters.push(preorder)
    conditions.push(`is_preorder = $${parameters.length}`)
  }

  const newRelease = normalizeBoolean(filters.newRelease)
  if (newRelease !== null) {
    parameters.push(newRelease)
    conditions.push(`is_new_release = $${parameters.length}`)
  }

  const promotion = normalizeBoolean(filters.promotion)
  if (promotion !== null) {
    parameters.push(promotion)
    conditions.push(`"promotionActive" = $${parameters.length}`)
  }

  conditions.push(...additionalConditions)

  const query = `
    WITH catalog_books AS (
      ${catalogQuery}
    )
    SELECT *
    FROM catalog_books AS catalog_book
    WHERE ${conditions.join('\n      AND ')}
  `

  return { query, parameters }
}

export const findActiveBooks = async (filters = {}) => {
  const { query, parameters } = buildCatalogQuery(filters)

  return database.query(`${query}\n    ORDER BY title ASC`, parameters)
}

export const findActiveBookById = async id => {
  const { query, parameters } = buildCatalogQuery({}, [`catalog_book.id = $1`])

  return database.query(query, [id, ...parameters])
}
