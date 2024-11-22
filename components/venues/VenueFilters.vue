<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <h2 class="text-lg font-semibold mb-4">{{ $t('filters') }}</h2>
    
    <div class="space-y-4">
      <!-- Country Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ $t('country') }}</label>
        <select
          v-model="filters.country"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        >
          <option value="">{{ $t('allCountries') }}</option>
          <option v-for="country in countries" :key="country" :value="country">
            {{ country }}
          </option>
        </select>
      </div>

      <!-- Venue Type Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ $t('venueType') }}</label>
        <select
          v-model="filters.type"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        >
          <option value="">{{ $t('allTypes') }}</option>
          <option v-for="type in venueTypes" :key="type" :value="type">
            {{ $t(`venueTypes.${type}`) }}
          </option>
        </select>
      </div>

      <!-- Capacity Range -->
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ $t('capacity') }}</label>
        <div class="grid grid-cols-2 gap-2">
          <input
            v-model.number="filters.minCapacity"
            type="number"
            :placeholder="$t('min')"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
          <input
            v-model.number="filters.maxCapacity"
            type="number"
            :placeholder="$t('max')"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VenueFilters, VenueType } from '~/types/venue'

const filters = ref<VenueFilters>({})
const emit = defineEmits<{
  (e: 'update:filters', filters: VenueFilters): void
}>()

const countries = ['Czech Republic', 'Germany', 'Austria']
const venueTypes: VenueType[] = ['venue', 'catering', 'photographer', 'music', 'decoration']

watch(filters, (newFilters) => {
  emit('update:filters', newFilters)
}, { deep: true })
</script>