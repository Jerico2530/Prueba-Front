<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '../stores/products'
import ProductTable from '../components/products/ProductTable.vue'
import Spinner from '../components/ui/Spinner.vue'
import ConfirmModal from '../components/ui/ConfirmModal.vue'

const store = useProductsStore()
const router = useRouter()
const productToDelete = ref(null)

onMounted(() => store.fetchAll())

function goToEdit(product) {
  router.push({ name: 'products.edit', params: { id: product.id } })
}

function askDelete(product) {
  productToDelete.value = product
}

async function confirmDelete() {
  await store.remove(productToDelete.value.id)
  productToDelete.value = null
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-6 py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-slate-800">Productos</h1>
      <RouterLink
        to="/products/create"
        class="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
      >
        Nuevo producto
      </RouterLink>
    </div>

    <Spinner v-if="store.loading" />
    <p v-else-if="store.error" class="text-rose-600 text-sm">{{ store.error }}</p>

    <div v-else class="bg-white rounded-lg shadow p-4">
      <ProductTable :products="store.items" @edit="goToEdit" @delete="askDelete" />
    </div>

    <ConfirmModal
      :show="!!productToDelete"
      :message="`¿Eliminar '${productToDelete?.name}'? Esta acción no se puede deshacer.`"
      @confirm="confirmDelete"
      @cancel="productToDelete = null"
    />
  </div>
</template>
