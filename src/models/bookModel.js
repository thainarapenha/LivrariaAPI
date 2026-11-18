const getValue = (data, camelCaseKey, snakeCaseKey) => {
  if (data[camelCaseKey] !== undefined) return data[camelCaseKey]
  return data[snakeCaseKey]
}

const isLegacyBook = data =>
  ['titulo', 'descricao', 'categoria', 'url_img', 'preco'].some(
    field => data[field] !== undefined,
  )

export default class BookModel {
  constructor(data = {}) {
    if (isLegacyBook(data)) {
      this.titulo = data.titulo
      this.descricao = data.descricao
      this.categoria = data.categoria
      this.url_img = data.url_img
      this.preco = data.preco
      this.total_paginas = data.total_paginas
      this.ano_publicacao = data.ano_publicacao
      this.autor = data.autor
      return
    }

    this.id = data.id
    this.title = data.title
    this.author = data.author
    this.publisher = data.publisher
    this.isbn = data.isbn
    this.description = data.description
    this.imageUrl = getValue(data, 'imageUrl', 'image_url')
    this.price = data.price
    this.stockQuantity = getValue(data, 'stockQuantity', 'stock_quantity')
    this.isActive = getValue(data, 'isActive', 'is_active')
    this.isPreorder = getValue(data, 'isPreorder', 'is_preorder')
    this.releaseDate = getValue(data, 'releaseDate', 'release_date')
    this.isNewRelease = getValue(data, 'isNewRelease', 'is_new_release')
    this.promotionPrice = getValue(data, 'promotionPrice', 'promotion_price')
    this.promotionStartsAt = getValue(
      data,
      'promotionStartsAt',
      'promotion_starts_at',
    )
    this.promotionEndsAt = getValue(
      data,
      'promotionEndsAt',
      'promotion_ends_at',
    )
    this.categories = data.categories
    this.effectivePrice = data.effectivePrice
    this.promotionActive = data.promotionActive
  }
}
