<template>
  <div>
    <h1 class="text-4xl font-bold text-gray-900 mb-8">{{ $t('welcome') }}</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Filters Sidebar -->
      <div class="lg:col-span-1">
        <VenueFilters @update:filters="updateFilters" />
      </div>

      <!-- Venue Grid -->
      <div class="lg:col-span-3">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <VenueCard
            v-for="venue in filteredVenues"
            :key="venue.id"
            :venue="venue"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Venue, VenueFilters } from '~/types/venue'

definePageMeta({
  layout: 'default'
})

// This would typically come from your API
const venues = ref<Venue[]>([
  {
    id: 1,
    name: 'Castle Venue',
    type: 'venue',
    capacity: 150,
    country: 'Czech Republic',
    city: 'Prague',
    address: 'Castle Street 1',
    description: 'Beautiful castle venue',
    images: ['/images/castle.jpg'],
    coordinates: { lat: 50.0755, lng: 14.4378 },
    contactEmail: 'castle@example.com',
    contactPhone: '+420123456789',
    priceRange: { min: 1000, max: 5000 }
  }
])

const filters = ref<VenueFilters>({})

const updateFilters = (newFilters: VenueFilters) => {
  filters.value = newFilters
}

const filteredVenues = computed(() => {
  return venues.value.filter(venue => {
    if (filters.value.country && venue.country !== filters.value.country) return false
    if (filters.value.type && venue.type !== filters.value.type) return false
    if (filters.value.minCapacity && venue.capacity < filters.value.minCapacity) return false
    if (filters.value.maxCapacity && venue.capacity > filters.value.maxCapacity) return false
    return true
  })
})
</script>