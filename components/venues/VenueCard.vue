<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="relative h-48">
      <img 
        :src="venue.images[0]" 
        :alt="venue.name"
        class="w-full h-full object-cover"
      />
      <div class="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm">
        {{ venue.type }}
      </div>
    </div>
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-2">{{ venue.name }}</h3>
      <div class="flex items-center text-gray-600 mb-2">
        <IconLocation class="w-4 h-4 mr-1" />
        {{ venue.city }}, {{ venue.country }}
      </div>
      <div class="flex items-center text-gray-600 mb-4">
        <IconUsers class="w-4 h-4 mr-1" />
        {{ venue.capacity }} {{ $t('guests') }}
      </div>
      <NuxtLink 
        :to="localePath(`/venues/${venue.id}`)"
        class="block w-full text-center bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
      >
        {{ $t('viewDetails') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Venue } from '~/types/venue'

const props = defineProps<{
  venue: Venue
}>()

const { localePath } = useLocalePath()
</script>