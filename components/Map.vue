<template>
  <div class="w-[80%] mx-auto mb-10">
    <client-only >
    <div id="map" class="w-full h-96 rounded-lg shadow-lg "></div>
  </client-only>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

onMounted(async () => {
  if (typeof window === 'undefined') return

  // استيراد leaflet فقط على المتصفح
  const L = await import('leaflet')
  await import('leaflet/dist/leaflet.css')

  // التأكد من وجود العنصر
  const map = L.map('map').setView([23.588, 58.3829], 15)

  // إضافة طبقة الخرائط
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  // إضافة ماركر
  L.marker([23.588, 58.3829])
    .addTo(map)
    .bindPopup(t('Academy Location, Muscat, Oman'))
    .openPopup()
})
</script>

<style scoped>
#map {
  height: 400px;
  width: 100%;
}
</style>
