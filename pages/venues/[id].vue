<template>
  <div class="mb-8">
    <NuxtLink to="/" class="text-primary hover:text-primary-dark">
      &larr; {{ $t("backToVenues") }}
    </NuxtLink>
  </div>

  <div v-if="venue" class="space-y-8">
    <!-- Gallery -->
    <VenueGallery :images="venue.images" />

    <!-- Venue Information -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h1 class="text-3xl font-bold mb-4">{{ venue.name }}</h1>
          <div class="flex items-center space-x-4 text-gray-600 mb-4">
            <div class="flex items-center">
              <IconLocation class="w-5 h-5 mr-2" />
              {{ venue.city }}, {{ venue.country }}
            </div>
            <div class="flex items-center">
              {{ venue.capacity }} {{ $t("guests") }}
            </div>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-4">
            <NuxtLink
              v-for="tag in venue.tags"
              :key="tag.id"
              :to="`/tags/${tag.slug}`"
              class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {{ tag.name }}
            </NuxtLink>
          </div>

          <div class="prose max-w-none">
            {{ venue.description }}
          </div>
        </div>

        <!-- Map -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4">{{ $t("location") }}</h2>
          <VenueMap
            :coordinates="venue.coordinates"
            :zoom="15"
            class="h-[400px] rounded-lg"
          />
        </div>
      </div>

      <!-- Contact Form -->
      <div class="lg:col-span-1">
        <VenueContactForm :venue-id="venue.id" :venue-name="venue.name" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Venue } from "~/types/venue";

const route = useRoute();
const { t } = useI18n();

// This would typically come from an API call
const venue = ref<Venue>({
  id: parseInt(route.params.id as string),
  name: "Castle Venue",
  type: "venue",
  capacity: 150,
  country: "Czech Republic",
  city: "Prague",
  address: "Castle Street 1",
  description:
    "Beautiful castle venue with stunning views and historic architecture.",
  images: ["/images/1.webp", "/images/2.webp", "/images/3.webp"],
  coordinates: { lat: 50.0755, lng: 14.4378 },
  contactEmail: "castle@example.com",
  contactPhone: "+420123456789",
  priceRange: { min: 1000, max: 5000 },
  tags: [
    { id: 2, name: "Historické prostory", slug: "historical" },
    { id: 4, name: "Moderní", slug: "modern" },
  ],
});

useHead({
  title: venue.value.name,
  meta: [{ name: "description", content: venue.value.description }],
});
</script>
