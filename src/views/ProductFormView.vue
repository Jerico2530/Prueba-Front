<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '../stores/products'
import { useCategoriesStore } from '../stores/categories'
import ProductForm from '../components/products/ProductForm.vue'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()

const serverErrors = ref({})
const isEditing = computed(() => !!route.params.id)

const currentProduct = computed(() =>
  productsStore.items.find((product) => product.id === Number(route.params.id)) ?? null,
)

onMounted(async () => {
  if (categoriesStore.items.length === 0) await categoriesStore.fetchAll()
  if (isEditing.value && productsStore.items.length === 0) await productsStore.fetchAll()
})

async function handleSubmit(payload) {
  serverErrors.value = {}

  try {
    if (isEditing.value) {
      await productsStore.update(Number(route.params.id), payload)
    } else {
      await productsStore.create(payload)
    }
    router.push({ name: 'products.index' })
  } catch (error) {
    if (error.response?.status === 422) {
      serverErrors.value = error.response.data.errors
    }
  }
}
</script>

<template>
  <div class="max-w-xl mx-auto px-6 py-8">
    <h1 class="text-xl font-semibold text-slate-800 mb-6">
      {{ isEditing ? 'Editar producto' : 'Nuevo producto' }}
    </h1>

    <div class="bg-white rounded-lg shadow p-6">
      <ProductForm
        :categories="categoriesStore.items"
        :initial-values="currentProduct"
        :server-errors="serverErrors"
        @submit="handleSubmit"
        @cancel="router.push({ name: 'products.index' })"
      />
    </div>
  </div>
</template>
