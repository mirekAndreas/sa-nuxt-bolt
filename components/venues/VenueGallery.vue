<template>
  <div class="relative bg-white rounded-lg shadow-md overflow-hidden">
    <Swiper
      :modules="[SwiperNavigation, SwiperPagination]"
      :slides-per-view="1"
      :navigation="true"
      :pagination="{ clickable: true }"
      class="h-[500px]"
    >
      <SwiperSlide v-for="(image, index) in images" :key="index">
        <img
          :src="image"
          :alt="`Gallery image ${index + 1}`"
          class="w-full h-full object-cover"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation as SwiperNavigation, Pagination as SwiperPagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

defineProps<{
  images: string[]
}>()
</script>