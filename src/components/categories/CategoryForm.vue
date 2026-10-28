<script setup>
import { reactive, watch } from 'vue'
import { validateCategoryForm } from '../../utils/validators'

const props = defineProps({
  initialValues: { type: Object, default: null },
  serverErrors: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({ name: '', description: '' })
const errors = reactive({})

watch(
  () => props.initialValues,
  (values) => {
    if (!values) return
    form.name = values.name
    form.description = values.description ?? ''
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
  const validationErrors = validateCategoryForm(form)

  if (Object.keys(validationErrors).length > 0) {
    Object.assign(errors, validationErrors)
    return
  }

  emit('submit', { ...form })
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
