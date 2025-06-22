<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener"
    class="flex flex-col items-center justify-center p-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
    :style="{ backgroundColor: color }"
  >
<Icon :icon="icon" width="40" height="40" class=" mb-2" />
    <span class="text-white font-bold text-lg">{{ name }}</span>
  </a>
</template>

<script setup>
import { Icon } from '@iconify/vue'

defineProps(['icon', 'name', 'url', 'color'])
</script>
