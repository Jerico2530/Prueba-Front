export function required(value) {
  if (value === null || value === undefined || String(value).trim() === '') {
    return 'Este campo es obligatorio.'
  }
  return null
}

export function positiveNumber(value) {
  if (value === null || value === undefined || value === '') {
    return 'Este campo es obligatorio.'
  }
  if (isNaN(value) || Number(value) <= 0) {
    return 'Debe ser un número mayor que 0.'
  }
  return null
}

export function nonNegativeInteger(value) {
  if (value === null || value === undefined || value === '') {
    return 'Este campo es obligatorio.'
  }
  if (!Number.isInteger(Number(value)) || Number(value) < 0) {
    return 'Debe ser un número entero mayor o igual a 0.'
  }
  return null
}

export function validateProductForm(form) {
  const errors = {}

  const nameError = required(form.name)
  if (nameError) errors.name = nameError

  const priceError = positiveNumber(form.price)
  if (priceError) errors.price = priceError

  const stockError = nonNegativeInteger(form.stock)
  if (stockError) errors.stock = stockError

  if (!form.category_id) errors.category_id = 'Seleccioná una categoría.'

  return errors
}

export function validateCategoryForm(form) {
  const errors = {}

  const nameError = required(form.name)
  if (nameError) errors.name = nameError

  return errors
}
