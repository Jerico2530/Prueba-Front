import { reactive } from 'vue'

export const toasts = reactive([])

let nextId = 1

function push(type, message) {
  const id = nextId++
  toasts.push({ id, type, message })

  setTimeout(() => remove(id), 4000)
}

function remove(id) {
  const index = toasts.findIndex((toast) => toast.id === id)
  if (index !== -1) toasts.splice(index, 1)
}

export const toast = {
  success: (message) => push('success', message),
  error: (message) => push('error', message),
  remove,
}
