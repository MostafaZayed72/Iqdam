<template>
  <div class="flex flex-col md:flex-row items-center justify-between bg-yellow-300 p-8 rounded-lg shadow-lg py-4">
    <!-- القسم الأول: النص الدعائي -->
    <div class="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0 mx-2">
      <h2 class="text-2xl font-bold text-one mb-4">
        {{ $t('Welcome to Iqdam academy for education!') }}
      </h2>
      <p class="text-gray-700">
        {{ $t('Iqdam Educational Academy is an innovative educational academy that aims to enable individuals to achieve their educational and professional goals in a modern and effective manner.') }}
      </p>
    </div>

    <!-- القسم الثاني: استمارة البريد الإلكتروني -->
    <div class="w-full md:w-1/2">
      <h3 class="text-xl font-bold text-one mb-4">{{ $t('Contact Us via Email') }}</h3>
      <form @submit.prevent="sendEmail" class="flex flex-col space-y-4">
        <input type="text" v-model="subject" :placeholder="t('Enter the subject')"
          class="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-one" />
        <textarea v-model="message" :placeholder="t('Write your message here')" rows="4"
          class="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-one"></textarea>
        <button type="submit" class="bg-one text-white py-2 px-4 rounded-lg hover:bg-one-dark transition">
          {{ $t('Send Email') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n();

// بيانات الاستمارة
const subject = ref('');
const message = ref('');

// دالة إرسال البريد الإلكتروني
const sendEmail = () => {
  const mailtoLink = `mailto:akadimisultan@gmail.com?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(message.value)}`;
  window.location.href = mailtoLink;
};
</script>

<style scoped>
.bg-one {
  background-color: #1d4ed8;
  /* لون أزرق */
}

.bg-one-dark {
  background-color: #1e40af;
  /* لون أزرق غامق */
}

.text-one {
  color: #1d4ed8;
}
</style>