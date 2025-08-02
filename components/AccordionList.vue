<template>
  <div>
    <div 
      v-for="(item, index) in items" 
      :key="index" 
      class="border-b"
    >
      <!-- العنوان -->
      <button 
        @click="$emit('update:modelValue', modelValue === index ? null : index)" 
        class="w-full text-start p-4 flex justify-between items-center text-lg"
      >
        {{ item.title }}
        <span>{{ modelValue === index ? '-' : '+' }}</span>
      </button>

      <!-- الوصف -->
      <div 
        v-if="modelValue === index" 
        class="p-4 text-gray-700 whitespace-pre-line bg-second rounded-xl"
      >
        {{ item.description }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: Array,
  modelValue: Number
});

defineEmits(['update:modelValue']);
</script>
