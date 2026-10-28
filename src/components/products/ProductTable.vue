<script setup>
defineProps({
  products: { type: Array, required: true },
})

const emit = defineEmits(['edit', 'delete'])

function formatPrice(value) {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(value)
}
</script>

<template>
  <table class="w-full text-sm">
    <thead>
      <tr class="text-left text-slate-500 border-b border-slate-200">
        <th class="py-2">Nombre</th>
        <th class="py-2">Categoría</th>
        <th class="py-2">Precio</th>
        <th class="py-2">Stock</th>
        <th class="py-2 text-right">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="product in products"
        :key="product.id"
        class="border-b border-slate-100 hover:bg-slate-50"
      >
        <td class="py-3">
          <p class="font-medium text-slate-800">{{ product.name }}</p>
          <p class="text-slate-400 text-xs">{{ product.description }}</p>
        </td>
        <td class="py-3 text-slate-600">{{ product.category?.name }}</td>
        <td class="py-3 text-slate-600">{{ formatPrice(product.price) }}</td>
        <td class="py-3 text-slate-600">{{ product.stock }}</td>
        <td class="py-3 text-right">
          <button class="text-indigo-600 hover:underline mr-3" @click="emit('edit', product)">
            Editar
          </button>
          <button class="text-rose-600 hover:underline" @click="emit('delete', product)">
            Eliminar
          </button>
        </td>
      </tr>
      <tr v-if="products.length === 0">
        <td colspan="5" class="py-6 text-center text-slate-400">No hay productos todavía.</td>
      </tr>
    </tbody>
  </table>
</template>
