<script setup>
import { computed, onMounted } from 'vue'
import { useProductsStore } from '../stores/products'
import { useCategoriesStore } from '../stores/categories'
import Spinner from '../components/ui/Spinner.vue'

const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()

onMounted(() => {
  productsStore.fetchAll()
  categoriesStore.fetchAll()
})

const loading = computed(() => productsStore.loading || categoriesStore.loading)

const totalStock = computed(() =>
  productsStore.items.reduce((sum, product) => sum + Number(product.stock), 0),
)

const lowStockCount = computed(
  () => productsStore.items.filter((product) => Number(product.stock) < 10).length,
)
</script>

<template>
  <div class="max-w-5xl mx-auto px-6 py-8">
    <h1 class="text-xl font-semibold text-slate-800 mb-6">Dashboard</h1>

    <Spinner v-if="loading" />

    <div v-else class="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow p-5">
        <p class="text-sm text-slate-500">Productos</p>
        <p class="text-2xl font-semibold text-slate-800">{{ productsStore.items.length }}</p>
      </div>
      <div class="bg-white rounded-lg shadow p-5">
        <p class="text-sm text-slate-500">Categorías</p>
        <p class="text-2xl font-semibold text-slate-800">{{ categoriesStore.items.length }}</p>
      </div>
      <div class="bg-white rounded-lg shadow p-5">
        <p class="text-sm text-slate-500">Stock total</p>
        <p class="text-2xl font-semibold text-slate-800">{{ totalStock }}</p>
      </div>
      <div class="bg-white rounded-lg shadow p-5">
        <p class="text-sm text-slate-500">Stock bajo (&lt; 10)</p>
        <p class="text-2xl font-semibold text-rose-600">{{ lowStockCount }}</p>
      </div>
    </div>
  </div>
</template>
