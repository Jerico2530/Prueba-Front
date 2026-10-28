<script setup>
import { onMounted, ref } from 'vue'
import { useCategoriesStore } from '../stores/categories'
import CategoryTable from '../components/categories/CategoryTable.vue'
import CategoryForm from '../components/categories/CategoryForm.vue'
import Spinner from '../components/ui/Spinner.vue'
import ConfirmModal from '../components/ui/ConfirmModal.vue'

const store = useCategoriesStore()
const showForm = ref(false)
const editingCategory = ref(null)
const serverErrors = ref({})
const categoryToDelete = ref(null)

onMounted(() => store.fetchAll())

function openCreate() {
  editingCategory.value = null
  serverErrors.value = {}
  showForm.value = true
}

function openEdit(category) {
  editingCategory.value = category
  serverErrors.value = {}
  showForm.value = true
}

async function handleSubmit(payload) {
  serverErrors.value = {}

  try {
    if (editingCategory.value) {
      await store.update(editingCategory.value.id, payload)
    } else {
      await store.create(payload)
    }
    showForm.value = false
  } catch (error) {
    if (error.response?.status === 422) {
      serverErrors.value = error.response.data.errors
    }
  }
}

function askDelete(category) {
  categoryToDelete.value = category
}

async function confirmDelete() {
  await store.remove(categoryToDelete.value.id)
  categoryToDelete.value = null
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-6 py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-slate-800">Categorías</h1>
      <button
        class="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
        @click="openCreate"
      >
        Nueva categoría
      </button>
    </div>

    <Spinner v-if="store.loading" />
    <p v-else-if="store.error" class="text-rose-600 text-sm">{{ store.error }}</p>

    <div v-else class="bg-white rounded-lg shadow p-4">
      <CategoryTable :categories="store.items" @edit="openEdit" @delete="askDelete" />
    </div>

    <div v-if="showForm" class="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 class="text-lg font-semibold text-slate-800 mb-4">
          {{ editingCategory ? 'Editar categoría' : 'Nueva categoría' }}
        </h2>
        <CategoryForm
          :initial-values="editingCategory"
          :server-errors="serverErrors"
          @submit="handleSubmit"
          @cancel="showForm = false"
        />
      </div>
    </div>

    <ConfirmModal
      :show="!!categoryToDelete"
      :message="`¿Eliminar '${categoryToDelete?.name}'? Esta acción no se puede deshacer.`"
      @confirm="confirmDelete"
      @cancel="categoryToDelete = null"
    />
  </div>
</template>
