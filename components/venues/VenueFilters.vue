<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <h2 class="text-lg font-semibold mb-4">{{ $t('filters') }}</h2>
    
    <div class="space-y-4">
      <!-- Search -->
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ $t('search') }}</label>
        <input
          v-model="filters.search"
          type="text"
          :placeholder="$t('searchPlaceholder')"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>

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

      <!-- Tags Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ $t('tags') }}</label>
        <div class="mt-1 flex flex-wrap gap-2">
          <button
            v-for="tag in availableTags"
            :key="tag.id"
            @click="toggleTag(tag.slug)"
            :class="[
              'px-2 py-1 rounded-full text-sm',
              filters.tags?.includes(tag.slug)
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ tag.name }}
          </button>
        </div>
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
import type { VenueFilters, VenueType, VenueTag } from '~/types/venue'

const filters = ref<VenueFilters>({})
const emit = defineEmits<{
  (e: 'update:filters', filters: VenueFilters): void
}>()

const countries = ['Czech Republic', 'Germany', 'Austria']
const venueTypes: VenueType[] = ['venue', 'catering', 'photographer', 'music', 'decoration']

// Sample tags - in production, these would come from an API
const availableTags: VenueTag[] = [
  { id: 1, name: 'Svatba v přírodě', slug: 'outdoor-wedding' },
  { id: 2, name: 'Historické prostory', slug: 'historical' },
  { id: 3, name: 'U vody', slug: 'waterfront' },
  { id: 4, name: 'Moderní', slug: 'modern' },
  { id: 5, name: 'Rustikální', slug: 'rustic' },
]

const toggleTag = (tagSlug: string) => {
  if (!filters.value.tags) {
    filters.value.tags = []
  }
  
  const index = filters.value.tags.indexOf(tagSlug)
  if (index === -1) {
    filters.value.tags.push(tagSlug)
  } else {
    filters.value.tags.splice(index, 1)
  }
}

watch(filters, (newFilters) => {
  emit('update:filters', newFilters)
}, { deep: true })
</script>