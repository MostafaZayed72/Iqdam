<template>
  <div class="h-screen flex flex-col justify-center items-center"
  style="min-height: 100vh; background-image: url('/imgs//backgrounds/features.png'); background-size: cover" >
    <v-carousel :height="carouselHeight" show-arrows="false" cycle hide-delimiter-background v-if="locale === 'ar'"  style="direction: ltr;">
      <v-carousel-item
        v-for="(image, index) in imagesAr"
        :key="index"
      >
        <div class="relative">
          <NuxtImg 
            class="sm:w-100 md:w-[70%] px-4 rounded-xl relative cursor-pointer md:h-[400px] mx-auto"
            :src="image"
            alt="Image" 
          />
        </div>
      </v-carousel-item>
    </v-carousel>
    <v-carousel :height="carouselHeight" show-arrows="false" cycle hide-delimiter-background style="direction: ltr;" v-else>
      <v-carousel-item
        v-for="(image, index) in imagesEn"
        :key="index"
      >
        <div class="relative">
          <NuxtImg 
            class="sm:w-100 md:w-[70%] px-4 rounded-xl relative cursor-pointer md:h-[400px] mx-auto"
            :src="image"
            alt="Image" 
          />
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const carouselHeight = ref(250);

const imagesAr = [
  "/imgs/features/2.png",
  "/imgs/features/4.png",
  "/imgs/features/6.png",
  "/imgs/features/8.png",
  "/imgs/features/10.png",
  "/imgs/features/12.png",
  "/imgs/features/20.png",
  
];

const imagesEn = [
  "/imgs/features/13.png",
  "/imgs/features/14.png",
  "/imgs/features/15.png",
  "/imgs/features/16.png",
  "/imgs/features/17.png",
  "/imgs/features/18.png",
  "/imgs/features/19.png",
];


const updateHeight = () => {
  if (window.innerWidth >= 580) {
    carouselHeight.value = 450;
  } else if (window.innerWidth >= 490) {
    carouselHeight.value = 350;
  } else if (window.innerWidth >= 410) {
    carouselHeight.value = 300;
  } else {
    carouselHeight.value = 240;
  }
};

onMounted(() => {
  updateHeight();
  window.addEventListener('resize', updateHeight);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateHeight);
});
</script>

<style>
/* لون الخلفية */
.v-window__left, 
.v-window__right {
  background-color: #e2c21e !important; /* لون مخصص */
  color: white !important; /* لون الأيقونة */
}

/* حجم الأسهم */
.v-btn--icon.v-btn--density-default {
  height: 36px !important;
  width: 36px !important;
}


/* لون النقاط */
.v-carousel__controls .v-btn {
  background-color: #ccc !important; /* اللون العادي */
}

/* النقطة النشطة */
.v-carousel__controls .v-btn.v-btn--active {
  background-color: #e2c21e !important; /* اللون وقت التحديد */
}

</style>
