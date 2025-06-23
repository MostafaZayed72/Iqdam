<template>
  <div class="min-h-screen flex items-center justify-center px-4 mt-40 w-50 mx-auto">
    <div class="w-full max-w-2xl card rounded-xl shadow-xl border-4  p-8 ">
      <h1 class="text-2xl font-bold mb-6 text-center text-primary dark:text-white">
        {{ $t('Register a new student') }}
      </h1>

      <form @submit.prevent="submitForm" class="space-y-5 ">
        <div v-for="field in fields" :key="field.model">
          <label class="block mb-1 text-sm font-medium my-4 ">
            {{ $t(field.label) }}
          </label>
          <input
            v-model="form[field.model]"
            :type="field.type"
            :placeholder="$t(field.placeholder || '')"
            style="border: solid black;"
            :class="[
    'w-full px-4 py-2 border-2 border-gray-800 rounded-lg text-gray-800 dark:text-white   focus:outline-none focus:ring-2 focus:ring-primary mt-1',
    $i18n.locale === 'ar' ? 'text-right placeholder:text-right' : 'text-left placeholder:text-left'
  ]"
          />
        </div>

        <div class="text-center mt-6">
          <button
            type="submit"
            class="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary-dark transition"
          >
            {{ $t('Submit') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  studentName: '',
  guardianName: '',
  primaryPhone: '',
  secondaryPhone: '',
  country: '',
  age: '',
  grade: '',
  email: ''
})

const fields = [
  { label: 'Student Name', model: 'studentName', type: 'text' },
  { label: 'Guardian Name', model: 'guardianName', type: 'text' },
  { label: 'Primary Phone Number', model: 'primaryPhone', type: 'tel', placeholder: 'e.g. +96812345678' },
  { label: 'Secondary Phone Number', model: 'secondaryPhone', type: 'tel', placeholder: 'e.g. +96898765432' },
  { label: 'Country', model: 'country', type: 'text' },
  { label: 'Age', model: 'age', type: 'number' },
  { label: 'Grade', model: 'grade', type: 'text' },
  { label: 'Email', model: 'email', type: 'email' }
]

const submitForm = () => {
  console.log('Form data:', form.value)
}
</script>
