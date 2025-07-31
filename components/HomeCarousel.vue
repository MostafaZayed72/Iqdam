<template>
  <div class="relative min-h-screen overflow-hidden" 
    @touchend="handleTouchEnd">
    <div class="transition-transform duration-700 ease-out"
      :style="{ transform: `translateY(-${currentIndex * 100}vh)` }">

      <!-- Slide 1 -->
      <div class="relative min-h-screen w-screen  overflow-hidden">
        <video class="absolute top-0 left-0 w-full h-full object-cover"
          src="https://res.cloudinary.com/dmsauhps3/video/upload/v1752599332/w9vitsxhxennkidyqwqt.mp4" autoplay loop
          muted playsinline></video>

        <!-- النص فوق الفيديو -->
        <div class="absolute inset-0 flex flex-col items-center justify-center z-10 ">
          <h1 class="text-one text-3xl md:text-6xl font-extrabold drop-shadow-lg text-center animate-fade mr-10"
            v-if="locale === 'ar'" >
            أكاديمية <span class="text-second bold"> إقدام</span> التعليمية
          </h1>
          <h1 class="text-one text-4xl md:text-6xl font-extrabold drop-shadow-lg text-center animate-fade ml-10" v-else>
            <span class="text-second bold">IQDAM</span> ACADEMY FOR EDUCATION
          </h1>
          <h1 class="text-black mt-10 bg-second p-1 rounded-xl text-sm mr-10" v-if="locale === 'ar'"> {{ $t('Comprehensive growth... world-class education... a safe environment in the heart of the Sultanate of Oman') }}</h1>
          <h1 class="text-black mt-10 bg-second p-1 rounded-xl text-sm ml-10" v-else>{{ $t('Comprehensive growth... world-class education... a safe environment in the heart of the Sultanate of Oman') }}</h1>
        </div>

      </div>

      <!-- Slide 2 -->
      <div class="flex flex-col items-center slide1"
        :class="{ 'slide-in-left': currentIndex === 1, 'slide-in-right': currentIndex === 2 }"
        >
        <SlidesTowRight class="w-full md:w-[30%]" />
      </div>

      <!-- Slide 3 -->
      <div class="min-h-screen w-full "
        
        :class="{ 'slide-in-left': currentIndex === 2, 'slide-in-right': currentIndex === 3 }">
        <SlidesThreeCenter />
      </div>

      <!-- Slide 4 (محتوى طويل) -->
      <div class="min-h-screen w-full "
        
        :class="{ 'slide-in-left': currentIndex === 3, 'slide-in-right': currentIndex === 4 }">
        <SlidesFourCenter />
      </div>
      <!-- Slide 5 -->
      <div class="min-h-screen flex items-center justify-center overflow-y-auto w-full"
        style="min-height: 100vh; background-image: url('/imgs//home/footer.jpeg'); background-size: cover"
        :class="{ 'slide-in-left': currentIndex === 4, 'slide-in-right': currentIndex === 5 }">

        <SlidesFiveCenter />
      </div>
    </div>

    <!-- Indicators on the side -->
   <!-- Indicators on the side -->
<div class="absolute mx-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-2">
  
  <!-- زر السابق -->
  <button 
    @click="prevSlide" 
    :disabled="currentIndex === 0" 
    class="bg-one text-white rounded-full p-2 mb-2 hover:bg-second transition disabled:opacity-50">
    ⬆
  </button>

  <!-- النقاط -->
  <div v-for="(_, index) in 5" 
       :key="index" 
       @click="goToSlide(index)" 
       :class="[
        'h-4 w-4 rounded-full cursor-pointer transition-all duration-300',
        currentIndex === index ? 'bg-second border-2 border-one' : 'bg-gray-500'
       ]">
  </div>

  <!-- زر التالي -->
  <button 
    @click="nextSlide" 
    :disabled="currentIndex === 4" 
    class="bg-one text-white rounded-full p-2 mt-2 hover:bg-second transition disabled:opacity-50">
    ⬇
  </button>
</div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();


const currentIndex = ref(0);
const nextSlide = () => {
  if (currentIndex.value < 4) {
    currentIndex.value++;
  }
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

// Handle mouse scroll
let isScrolling = false;
const handleScroll = (event) => {
  if (isScrolling) return;

  isScrolling = true;

  if (event.deltaY > 0 && currentIndex.value < 4) {
    currentIndex.value++;
  } else if (event.deltaY < 0 && currentIndex.value > 0) {
    currentIndex.value--;
  }

  setTimeout(() => (isScrolling = false), 800);
};


const touchStartY = ref(0);
const touchEndY = ref(0);
const isAtEdge = ref(false);

const handleTouchStart = (event) => {
  touchStartY.value = event.touches[0].clientY;
  checkIfAtEdge(event);
};

const handleTouchEnd = (event) => {
  touchEndY.value = event.changedTouches[0].clientY;
  handleVerticalSwipe(event);
};

const checkIfAtEdge = (event) => {
  const currentSlide = event.target.closest('.min-h-screen');
  const atTop = currentSlide.scrollTop === 0;
  const atBottom = currentSlide.scrollHeight - currentSlide.scrollTop === currentSlide.clientHeight;
  isAtEdge.value = atTop || atBottom;
};

const handleVerticalSwipe = (event) => {
  const swipeThreshold = 50;
  const swipeDistance = touchStartY.value - touchEndY.value;

  if (!isAtEdge.value) return; // لا تتنقل إذا لم تكن عند الحافة

  if (swipeDistance > swipeThreshold && currentIndex.value < 4) {
    // السحب لأعلى عند الحافة السفلية
    currentIndex.value++;
  } else if (swipeDistance < -swipeThreshold && currentIndex.value > 0) {
    // السحب لأسفل عند الحافة العلوية
    currentIndex.value--;
  }
};

// Navigate to slide from indicators
const goToSlide = (index) => {
  currentIndex.value = index;
};
</script>

<style scoped>
div.min-h-screen {
  height: 100vh;
  background-size: cover;
  background-position: center;
}

.slide-in-left {
  animation: slide-in-left 1s forwards;
}

.slide-in-right {
  animation: slide-in-right 1s forwards;
}

@keyframes fade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade {
  animation: fade 1.5s ease-out;
}

@keyframes slide-in-left {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.overflow-y-auto {
  overflow-y: auto;
  max-height: 100vh;
}

.slide1 {
  min-height: 100vh;
  background-size: cover;
  background-image: url('/imgs/home/welcome.png'); /* الصورة الكبيرة */
}

@media (max-width: 768px) {
  .slide1 {
    
    background-image: url('/imgs/home/welcome.jpeg'); 
  }
}

</style>
