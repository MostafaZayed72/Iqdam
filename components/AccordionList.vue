<template>
  <div class="space-y-4">
    <div v-for="(item, index) in items" :key="index" class="border rounded-lg overflow-hidden shadow-sm  card">
      <button class="w-full text-right p-4 font-semibold flex justify-between items-center" @click="toggle(index)">
        {{ item.title }}
        <span class="ml-2 text-one text-xl">
          <span v-if="active === index">−</span>
          <span v-else>+</span>
        </span>
      </button>
      <transition name="accordion" mode="out-in">
        <div v-if="active === index" class="px-4 pb-4 ">
          {{ item.description }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: Array,
  modelValue: [Number, null]
})

const emit = defineEmits(['update:modelValue'])

const active = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const toggle = (index) => {
  active.value = active.value === index ? null : index
}
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
