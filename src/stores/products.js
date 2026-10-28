import { defineStore } from 'pinia'
import api from '../services/api'
import { toast } from '../utils/toast'

export const useProductsStore = defineStore('products', {
  state: () => ({
    items: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchAll() {
      this.loading = true
      this.error = null

      try {
        const { data } = await api.get('/products')
        this.items = data.data
      } catch (error) {
        this.error = 'No se pudieron cargar los productos.'
      } finally {
        this.loading = false
      }
    },

    async create(payload) {
      const { data } = await api.post('/products', payload)
      this.items.unshift(data.data)
      toast.success(data.message)
      return data.data
    },

    async update(id, payload) {
      const { data } = await api.put(`/products/${id}`, payload)
      const index = this.items.findIndex((item) => item.id === id)
      if (index !== -1) this.items[index] = data.data
      toast.success(data.message)
      return data.data
    },

    async remove(id) {
      const { data } = await api.delete(`/products/${id}`)
      this.items = this.items.filter((item) => item.id !== id)
      toast.success(data.message)
    },
  },
})
