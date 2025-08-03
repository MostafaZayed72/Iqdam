<template>
  <div style="background-image: url('/imgs/backgrounds/تواصل معنا.png'); min-height: 100vh; background-size: cover">
    <section class=" bg-gray-50 dark:bg-gray-900 py-12 px-4 text-center " style="background-image: url('/imgs/backgrounds/تواصل معنا.png');  background-size: cover">
      <h1 class="text-3xl md:text-4xl font-bold text-one dark:text-white mb-8">
        {{ $t('Contact us') }}
      </h1>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <ContactCard v-for="(platform, index) in socialPlatforms" :key="index" :icon="platform.icon"
          :name="t(platform.name)" :url="platform.url" :color="platform.color" />
      </div>

    </section>
    <Map />

    <Footer />
  </div>

</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const socialPlatforms = [
  {
    name: 'Whatsapp',
    url: 'https://wa.me/96898179514',
    icon: 'logos:whatsapp-icon',
    color: '#25D366'
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/IqdamAcademy?rdid=NXgdupbOOpwxZcYZ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1ANystH1s5%2F',
    icon: 'logos:facebook',
    color: '#1877F2'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/iqdamacademy?igsh=MTV2b3ZmdDN3NnNkZQ%3D%3D',
    icon: 'logos:instagram-icon',
    color: '#E4405F'
  },
  {
    name: 'Tik tok',
    url: 'https://www.tiktok.com/@iqdamacademy?_t=ZS-8wZWJlYSNV3&_r=1',
    icon: 'logos:tiktok-icon',
    color: '#000000'
  },
  {
    name: 'Twitter',
    url: 'https://x.com/IqdamAcademy',
    icon: 'hugeicons:new-twitter',
    color: '#1DA1F2'
  },
  {
    name: 'Youtube',
    url: 'https://www.youtube.com/@iqdam_akadimi',
    icon: 'logos:youtube-icon',
    color: '#f5595a'
  },
  {
    name: 'Snapchat',
    url: 'https://www.snapchat.com/add/kdymylsltn?share_id=QDWoMiPF_sg&locale=ar-AE',
    icon: 'ph:snapchat-logo-bold',
    color: '#fba615'
  }
]
</script>
