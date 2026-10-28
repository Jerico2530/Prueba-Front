<script setup>
import { toasts, toast } from '../../utils/toast'
</script>

<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 w-80">
    <div
      v-for="item in toasts"
      :key="item.id"
      class="rounded-lg px-4 py-3 shadow-lg text-sm text-white flex justify-between items-start gap-3"
      :class="item.type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'"
    >
      <span>{{ item.message }}</span>
      <button class="font-bold leading-none" @click="toast.remove(item.id)">×</button>
    </div>
  </div>
</template>
