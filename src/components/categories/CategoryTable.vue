<script setup>
defineProps({
  categories: { type: Array, required: true },
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <table class="w-full text-sm">
    <thead>
      <tr class="text-left text-slate-500 border-b border-slate-200">
        <th class="py-2">Nombre</th>
        <th class="py-2">Descripción</th>
        <th class="py-2 text-right">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="category in categories"
        :key="category.id"
        class="border-b border-slate-100 hover:bg-slate-50"
      >
        <td class="py-3 font-medium text-slate-800">{{ category.name }}</td>
        <td class="py-3 text-slate-600">{{ category.description }}</td>
        <td class="py-3 text-right">
          <button class="text-indigo-600 hover:underline mr-3" @click="emit('edit', category)">
            Editar
          </button>
          <button class="text-rose-600 hover:underline" @click="emit('delete', category)">
            Eliminar
          </button>
        </td>
      </tr>
      <tr v-if="categories.length === 0">
        <td colspan="3" class="py-6 text-center text-slate-400">No hay categorías todavía.</td>
      </tr>
    </tbody>
  </table>
</template>
