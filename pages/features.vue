<template>
  <div class="mt-40 min-h-screen">
    <v-carousel :height="carouselHeight" show-arrows="false" cycle hide-delimiter-background>
      <v-carousel-item>
        <div class="relative">
          <img class="sm:w-100 md:w-[70%] px-4 rounded-xl relative cursor-pointer md:h-[400px] mx-auto" src="https://assets.e3arabi.com/wp-content/uploads/2021/01/online-3412473_640-3.jpg" alt="Image" />
         
        </div>
      </v-carousel-item>
      <v-carousel-item>
        <div class="relative">
          <img v-if="$i18n.locale === 'ar-AR'" class="sm:w-100 md:w-[70%] px-4 rounded-xl relative cursor-pointer md:h-[400px] mx-auto" src="https://iqdamacademy.com/media/main2.jpeg" alt="Image"  />
          <img v-else class="sm:w-100 md:w-[70%] px-4 rounded-xl relative cursor-pointer md:h-[400px] mx-auto" src="https://iqdamacademy.com/media/main2.jpeg" alt="Image"  />
         
        </div>
      </v-carousel-item>
      <v-carousel-item>
        <div class="relative">
          <img v-if="$i18n.locale === 'ar-AR'" class="sm:w-100 md:w-[70%] px-4 rounded-xl relative cursor-pointer md:h-[400px] mx-auto" src="https://i.ytimg.com/vi/XJfXBlhT5H8/hqdefault.jpg" alt="Image"  />
          <img v-else class="sm:w-100 md:w-[70%] px-4 rounded-xl relative cursor-pointer md:h-[400px] mx-auto" src="https://i.ytimg.com/vi/XJfXBlhT5H8/hqdefault.jpg" alt="Image"  />
         
        </div>
      </v-carousel-item>
      <v-carousel-item>
        <div class="relative">
          <img v-if="$i18n.locale === 'ar-AR'" class="sm:w-100 md:w-[70%] px-4 rounded-xl relative cursor-pointer md:h-[400px] mx-auto" src="https://scontent.fcai19-8.fna.fbcdn.net/v/t39.30808-6/490358802_664285513427644_7818927235157923863_n.png?stp=dst-png_s960x960&_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeEJiSsIVEPMMA0EViV0MifBTO1f5yt88SVM7V_nK3zxJYdfYgOjvVyk_LBUMbU0iVebEIH--Vd2D6YTlLDp22I2&_nc_ohc=0G-9a58rLosQ7kNvwH7_opi&_nc_oc=Adl_rfJGbEn1Qg4huEBf-qc6ch0Gs7q133ZRUd4PymoxKleBpJUjZ4aHk4C5R-JEKjo&_nc_zt=23&_nc_ht=scontent.fcai19-8.fna&_nc_gid=N_tEgGojKfQkmxOpu-I4DQ&oh=00_AfNU-vIABtdpRJ-Jbu-Z6uUe-8Sf47C1__wes094oDaC1Q&oe=685F66F8" alt="Image"  />
          <img v-else class="sm:w-100 md:w-[70%] px-4 rounded-xl relative cursor-pointer md:h-[400px] mx-auto" src="https://scontent.fcai19-8.fna.fbcdn.net/v/t39.30808-6/490358802_664285513427644_7818927235157923863_n.png?stp=dst-png_s960x960&_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeEJiSsIVEPMMA0EViV0MifBTO1f5yt88SVM7V_nK3zxJYdfYgOjvVyk_LBUMbU0iVebEIH--Vd2D6YTlLDp22I2&_nc_ohc=0G-9a58rLosQ7kNvwH7_opi&_nc_oc=Adl_rfJGbEn1Qg4huEBf-qc6ch0Gs7q133ZRUd4PymoxKleBpJUjZ4aHk4C5R-JEKjo&_nc_zt=23&_nc_ht=scontent.fcai19-8.fna&_nc_gid=N_tEgGojKfQkmxOpu-I4DQ&oh=00_AfNU-vIABtdpRJ-Jbu-Z6uUe-8Sf47C1__wes094oDaC1Q&oe=685F66F8" alt="Image"  />
         
        </div>
      </v-carousel-item>
     
     
     
    </v-carousel>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const carouselHeight = ref(250); // الطول الافتراضي للشاشات الصغيرة
const products = ref([]); // لتخزين المنتجات

// دالة لتحديث الارتفاع بناءً على حجم الشاشة
const updateHeight = () => {
  if (window.innerWidth >= 580) {
    carouselHeight.value = 450; // الطول للشاشات الكبيرة جدًا
  } else if (window.innerWidth >= 490) {
    carouselHeight.value = 350; // الطول للشاشات الكبيرة
  } else if (window.innerWidth >= 410) {
    carouselHeight.value = 300; // الطول للشاشات المتوسطة
  } else {
    carouselHeight.value = 240; // الطول للشاشات الصغيرة
  }
};

// دالة لجلب المنتجات
const fetchProducts = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Products/GetAllProducts`);
    const data = await response.json();
    products.value = data.data.map(product => ({
  id: product.id,
  imageUrl: `${import.meta.env.VITE_API_BASE_URL}/${product.images?.[0]?.url}`, // استخدام أول صورة مع المسار الكامل
}));

  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

onMounted(() => {
  updateHeight(); // تعيين الارتفاع عند تحميل الصفحة
  fetchProducts(); // جلب المنتجات عند تحميل الصفحة

  // إضافة مستمع للحدث resize لتحديث الارتفاع عند تغيير حجم الشاشة
  window.addEventListener('resize', updateHeight);
});

onUnmounted(() => {
  // إزالة مستمع الحدث عند التخلص من المكون
  window.removeEventListener('resize', updateHeight);
});
</script>




<style>






.v-btn--icon.v-btn--density-default {
  background-color: rgb(85, 12, 153) !important;
  height: 12px !important;
  width: 12px !important;
}

.v-btn--icon.v-btn--density-default {
  color: rgb(251, 250, 252) !important;

}

.mdi:before {
  display: none !important
}

.v-window__right {
  display: none !important
}

.v-window__left {
  display: none !important
}
</style>
