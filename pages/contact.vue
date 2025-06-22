<template>
 <div>
     <section class=" bg-gray-50 dark:bg-gray-900 py-12 px-4 text-center mt-40">
    <h1 class="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-8">
        {{ $t('Contact us') }}
    </h1>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
      <ContactCard
        v-for="(platform, index) in socialPlatforms"
        :key="index"
        :icon="platform.icon"
        :name="t(platform.name)"
        :url="platform.url"
        :color="platform.color"
      />
    </div>
    
  </section>
      <Map  />

  <Footer />
 </div>

</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const socialPlatforms = [
  {
    name: 'Whatsapp',
    url: 'https://wa.me/201234567890',
    icon: 'logos:whatsapp-icon',
    color: '#25D366'
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/yourpage',
    icon: 'logos:facebook',
    color: '#1877F2'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/youraccount',
    icon: 'logos:instagram-icon',
    color: '#E4405F'
  },
  {
    name: 'Tik tok',
    url: 'https://www.tiktok.com/@youraccount',
    icon: 'logos:tiktok-icon',
    color: '#000000'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/youraccount',
    icon: 'logos:twitter',
    color: '#1DA1F2'
  },
  {
    name: 'Youtube',
    url: 'https://youtube.com/yourchannel',
    icon: 'logos:youtube-icon',
    color: '#FF0000'
  },
  {
    name: 'Snapchat',
    url: 'https://www.snapchat.com/add/youraccount',
    icon: 'ph:snapchat-logo-bold',
    color: '#fba615'
  }
]
</script>
