<script setup>
import { reactive, watch } from 'vue'
import { validateProductForm } from '../../utils/validators'

const props = defineProps({
  categories: { type: Array, required: true },
  initialValues: { type: Object, default: null },
  serverErrors: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  name: '',
  description: '',
  price: '',
  stock: '',
  category_id: '',
})

const errors = reactive({})

watch(
  () => props.initialValues,
  (values) => {
    if (!values) return
    form.name = values.name
    form.description = values.description ?? ''
    form.price = values.price
    form.stock = values.stock
    form.category_id = values.category_id
  },
  { immediate: true },
)

watch(
  () => props.serverErrors,
  (value) => {
    Object.keys(errors).forEach((key) => delete errors[key])
    Object.entries(value || {}).forEach(([key, messages]) => {
      errors[key] = messages[0]
    })
  },
)

function handleSubmit() {
  Object.keys(errors).forEach((key) => delete errors[key])
  const validationErrors = validateProductForm(form)

  if (Object.keys(validationErrors).length > 0) {
    Object.assign(errors, validationErrors)
    return
  }

  emit('submit', { ...form, price: Number(form.price), stock: Number(form.stock) })
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div>
      <label class="block text-sm font-medium text-slate-700">Nombre</label>
      <input
        v-model="form.name"
        type="text"
        class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
      />
      <p v-if="errors.name" class="text-rose-600 text-xs mt-1">{{ errors.name }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700">Descripción</label>
      <textarea
        v-model="form.description"
        rows="2"
        class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
      ></textarea>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-slate-700">Precio</label>
        <input
          v-model="form.price"
          type="number"
          step="0.01"
          class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <p v-if="errors.price" class="text-rose-600 text-xs mt-1">{{ errors.price }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700">Stock</label>
        <input
          v-model="form.stock"
          type="number"
          class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <p v-if="errors.stock" class="text-rose-600 text-xs mt-1">{{ errors.stock }}</p>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700">Categoría</label>
      <select
        v-model="form.category_id"
        class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
      >
        <option value="" disabled>Seleccioná una categoría</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
      <p v-if="errors.category_id" class="text-rose-600 text-xs mt-1">{{ errors.category_id }}</p>
    </div>

    <div class="flex justify-end gap-2 pt-2">
      <button
        type="button"
        class="px-4 py-2 text-sm rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50"
        @click="emit('cancel')"
      >
        Cancelar
      </button>
      <button type="submit" class="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
        Guardar
      </button>
    </div>
  </form>
</template>
