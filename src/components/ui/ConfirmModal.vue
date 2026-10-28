<script setup>
defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: '¿Estás seguro?' },
  message: { type: String, default: 'Esta acción no se puede deshacer.' },
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
      <h3 class="text-lg font-semibold text-slate-800">{{ title }}</h3>
      <p class="text-sm text-slate-500 mt-2">{{ message }}</p>
      <div class="flex justify-end gap-2 mt-6">
        <button
          class="px-4 py-2 text-sm rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50"
          @click="emit('cancel')"
        >
          Cancelar
        </button>
        <button
          class="px-4 py-2 text-sm rounded-md bg-rose-600 text-white hover:bg-rose-700"
          @click="emit('confirm')"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>
