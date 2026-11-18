const normalizeTaxId = (taxId) => {
  const normalizedTaxId = String(taxId).replace(/\D/g, '')
  console.log(normalizedTaxId)
  if (normalizedTaxId.length !== 11 && !/[A-Z]/gi.test(normalizedTaxId)) return false
  return normalizedTaxId
}

export function validateEmployee(request, response, next) {
  let { CPF: taxId, nome: name, cargo: role, salario: salary, statusFuncionario: employeeStatus } = request.body
  taxId = normalizeTaxId(taxId)
  if (!taxId) return response.status(400).json({ error: 'CPF inválido' })
  if (!name || !role || !salary || !employeeStatus) return response.status(400).json({ error: 'Dados insuficientes' })
  request.body.CPF = taxId
  next()
}
