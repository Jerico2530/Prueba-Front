<script setup>
const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/products', label: 'Productos' },
  { to: '/categories', label: 'Categorías' },
]
</script>

<template>
  <nav class="bg-white border-b border-slate-200 px-6 py-4">
    <div class="max-w-5xl mx-auto flex items-center justify-between">
      <span class="font-semibold text-slate-800">Overskull · Panel</span>
      <div class="flex gap-4">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-sm text-slate-600 hover:text-indigo-600"
          active-class="text-indigo-600 font-medium"
        >
          {{ link.label }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
