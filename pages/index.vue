<template>
  <div>
    <h1 class="text-4xl font-bold text-gray-900 mb-8">{{ $t("welcome") }}</h1>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Filters Sidebar -->
      <div class="lg:col-span-1">
        <VenueFilters @update:filters="updateFilters" />
      </div>

      <!-- Venue Grid -->
      <div class="lg:col-span-3">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <VenueCard
            v-for="venue in sortedVenues"
            :key="venue.id"
            :venue="venue"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Venue, VenueFilters } from "~/types/venue";

definePageMeta({
  layout: "default",
});

// Sample venues data with subscription tiers
const venues = ref<Venue[]>([
  {
    id: 1,
    name: "Zámek Mcely",
    type: "venue",
    capacity: 150,
    country: "Czech Republic",
    city: "Mcely",
    address: "Mcely 61, 289 36 Mcely",
    description:
      "Luxusní zámecký hotel s překrásnou zahradou pro svatební obřady",
    images: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3",
    ],
    coordinates: { lat: 50.2866, lng: 15.0726 },
    contactEmail: "info@zamek-mcely.cz",
    contactPhone: "+420313333333",
    priceRange: { min: 3000, max: 8000 },
    tags: [
      { id: 2, name: "Historické prostory", slug: "historical" },
      { id: 4, name: "Moderní", slug: "modern" },
    ],
    subscription: {
      tier: "premium",
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      price: 999,
    },
  },
  {
    id: 2,
    name: "Svatební Statek",
    type: "venue",
    capacity: 80,
    country: "Czech Republic",
    city: "Český Krumlov",
    address: "Rooseveltova 28, Český Krumlov",
    description: "Rustikální statek s autentickou atmosférou pro menší svatby",
    images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3",
    ],
    coordinates: { lat: 48.8127, lng: 14.3175 },
    contactEmail: "info@svatebnistatek.cz",
    contactPhone: "+420777888999",
    priceRange: { min: 1500, max: 4000 },
    tags: [
      { id: 1, name: "Svatba v přírodě", slug: "outdoor-wedding" },
      { id: 5, name: "Rustikální", slug: "rustic" },
    ],
    subscription: {
      tier: "member",
      validFrom: "2024-01-01",
      validTo: "2024-12-30",
      price: 499,
    },
  },
]);

const filters = ref<VenueFilters>({});

const updateFilters = (newFilters: VenueFilters) => {
  filters.value = newFilters;
};

const isVenueValid = (venue: Venue) => {
  const now = new Date();
  const validTo = venue.subscription.validTo
    ? new Date(venue.subscription.validTo)
    : null;
  return !validTo || validTo > now;
};

const filteredVenues = computed(() => {
  return venues.value.filter((venue) => {
    // Check if venue subscription is valid
    if (!isVenueValid(venue)) return false;

    // Full-text search
    if (filters.value.search) {
      const searchTerm = filters.value.search.toLowerCase();
      const searchableText = [
        venue.name,
        venue.description,
        venue.city,
        venue.country,
        ...venue.tags.map((tag) => tag.name),
      ]
        .join(" ")
        .toLowerCase();

      if (!searchableText.includes(searchTerm)) {
        return false;
      }
    }

    // Tags filter
    if (filters.value.tags?.length) {
      const venueTagSlugs = venue.tags.map((tag) => tag.slug);
      if (
        !filters.value.tags.some((tagSlug) => venueTagSlugs.includes(tagSlug))
      ) {
        return false;
      }
    }

    // Other filters
    if (filters.value.country && venue.country !== filters.value.country)
      return false;
    if (filters.value.type && venue.type !== filters.value.type) return false;
    if (filters.value.minCapacity && venue.capacity < filters.value.minCapacity)
      return false;
    if (filters.value.maxCapacity && venue.capacity > filters.value.maxCapacity)
      return false;

    return true;
  });
});

// Sort venues by subscription tier: Premium first, then Member, then Free
const sortedVenues = computed(() => {
  const tierOrder = {
    premium: 0,
    member: 1,
    free: 2,
  };

  return [...filteredVenues.value].sort((a, b) => {
    return tierOrder[a.subscription.tier] - tierOrder[b.subscription.tier];
  });
});
</script>
