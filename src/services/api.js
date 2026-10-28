import axios from 'axios'
import { toast } from '../utils/toast'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error('No se pudo conectar con el servidor. Revisá tu conexión.')
      return Promise.reject(error)
    }

    const { status, data } = error.response

    if (status !== 422) {
      toast.error(data?.message || 'Ocurrió un error al procesar la solicitud.')
    }

    return Promise.reject(error)
  },
)

export default api
