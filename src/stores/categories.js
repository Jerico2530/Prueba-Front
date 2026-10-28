import { defineStore } from 'pinia'
import api from '../services/api'
import { toast } from '../utils/toast'

export const useCategoriesStore = defineStore('categories', {
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
        const { data } = await api.get('/categories')
        this.items = data.data
      } catch (error) {
        this.error = 'No se pudieron cargar las categorías.'
      } finally {
        this.loading = false
      }
    },

    async create(payload) {
      const { data } = await api.post('/categories', payload)
      this.items.unshift(data.data)
      toast.success(data.message)
      return data.data
    },

    async update(id, payload) {
      const { data } = await api.put(`/categories/${id}`, payload)
      const index = this.items.findIndex((item) => item.id === id)
      if (index !== -1) this.items[index] = data.data
      toast.success(data.message)
      return data.data
    },

    async remove(id) {
      const { data } = await api.delete(`/categories/${id}`)
      this.items = this.items.filter((item) => item.id !== id)
      toast.success(data.message)
    },
  },
})
