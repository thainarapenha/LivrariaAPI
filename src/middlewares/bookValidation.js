export default function validateBook(request, response, next) {
  if (Object.keys(request.body).length < 8) return response.status(400).json({ erro: 'Insira todas as informações necessárias' })
  for (const field of Object.keys(request.body)) {
    if (!request.body[field]) return response.status(400).json({ erro: `${field} é um campo obrigatório` })
  }
  return next()
}
