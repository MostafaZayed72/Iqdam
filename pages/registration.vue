<template>
  <div style="background-image: url('/imgs/backgrounds/صفحة التسجيل.png'); min-height: 100vh; background-size: cover">
    <div class="min-h-screen flex items-center justify-center px-4 mx-auto pb-10">
      <div class="w-full max-w-2xl card rounded-xl shadow-xl border-4 p-8 mt-10">
        <h1 class="text-2xl font-bold mb-6 text-center text-one dark:text-white">
          {{ $t('Register a new student') }}
        </h1>

        <form @submit.prevent="submitForm" class="space-y-5">
          <div v-for="field in fields" :key="field.model">
            <label class="block mb-1 text-sm my-4 font-bold">
              {{ $t(field.label) }}
            </label>
            <input 
              v-if="field.type !== 'file'"
              v-model="form[field.model]" 
              :type="field.type" 
              :placeholder="$t(field.placeholder || '')"
              style="border: solid black;" 
              :class="[ 
                'w-full px-4 py-2 border-2 border-gray-800 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-one mt-1',
                $i18n.locale === 'ar' ? 'text-right placeholder:text-right' : 'text-left placeholder:text-left'
              ]"
            />
            
            <!-- حقل رفع الصورة -->
            <input 
              v-else
              type="file"
              accept="image/*"
              @change="handleFileUpload"
              style="border: solid black;" 
              class="w-full px-4 py-2 border-2 border-gray-800 rounded-lg text-gray-800 dark:text-white 
                     focus:outline-none focus:ring-2 focus:ring-one mt-1"
            />
            
            <div v-if="field.type === 'file' && form.profilePictureUrl" class="mt-3 text-center">
              <img :src="form.profilePictureUrl" alt="Profile Preview" class="w-24 h-24 rounded-full mx-auto shadow-lg" />
            </div>
          </div>

          <!-- زر التسجيل -->
          <div class="text-center mt-6">
            <button 
              type="submit" 
              class="bg-one text-white py-2 px-6 rounded-lg hover:bg-one-dark transition"
              :disabled="loader || uploadingImage"
            >
              {{ loader ? $t('Submitting...') : $t('Submit') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ✅ Dialog بعد نجاح التسجيل -->
    <div v-if="showDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl p-8 w-80 text-center">
        <h2 class="text-green-600 text-xl font-bold mb-4">✅ {{ $t('You have successfully subscribed') }}</h2>
            <payment id="payment" class="py-10" />

        <button
          @click="closeDialog"
          class="mt-4 text-gray-500 underline"
        >
          {{ $t('Close') }}
        </button>
      </div>
    </div>
<Loader v-if="loader"/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'
const loader = ref(false)

const config = useRuntimeConfig()
const uploadingImage = ref(false)
const showDialog = ref(false)

const CLOUD_NAME = "dmsauhps3"
const UPLOAD_PRESET = "nuxt_unsigned"

const form = ref({
  studentName: '',
  guardianName: '',
  primaryPhoneNumber: '',
  backupPhoneNumber: '',
  nationality: '',
  currentResidence: '',
  age: null,
  grade: '',
  email: '',
  profilePictureUrl: ''
})

const fields = [
  { label: 'Student Name', model: 'studentName', type: 'text' },
  { label: 'Guardian Name', model: 'guardianName', type: 'text' },
  { label: 'Primary Phone Number (with country key)', model: 'primaryPhoneNumber', type: 'tel', placeholder: 'e.g. +96812345678' },
  { label: 'Backup Phone Number (with country key)', model: 'backupPhoneNumber', type: 'tel', placeholder: 'e.g. +96898765432' },
  { label: 'Nationality', model: 'nationality', type: 'text' },
  { label: 'Current Residence', model: 'currentResidence', type: 'text' },
  { label: 'Age', model: 'age', type: 'number' },
  { label: 'Grade', model: 'grade', type: 'text' },
  { label: 'Email', model: 'email', type: 'email' },
  { label: 'Profile Picture', model: 'profilePictureUrl', type: 'file' }
]

// رفع الصورة
const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  uploadingImage.value = true

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)

  try {
    loader.value = true
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    form.value.profilePictureUrl = data.secure_url
  } catch (error) {
    console.error('❌ Error uploading image:', error)
    alert('Failed to upload image')
  } finally {
    uploadingImage.value = false
        loader.value = false

  }
}

const submitForm = async () => {
  try {
        loader.value = true

    const response = await $fetch('/api/StudentProfiles/Add', {
      baseURL: config.public.baseUrl,
      method: 'POST',
      body: form.value
    })

    if (response) {
      showDialog.value = true
    }
  } catch (error) {
    console.error('❌ Error:', error)
    alert('حدث خطأ أثناء إرسال النموذج')
  } finally {
    loader.value = false
  }
}

const goToPayment = () => {
  const paymentSection = document.getElementById('payment')
  if (paymentSection) {
    paymentSection.scrollIntoView({ behavior: 'smooth' })
  }
  closeDialog()
}

const closeDialog = () => {
  showDialog.value = false
}
</script>
