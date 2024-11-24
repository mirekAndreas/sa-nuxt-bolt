<template>
  <div>
    <div class="mb-8">
      <NuxtLink to="/" class="text-primary hover:text-primary-dark">
        &larr; {{ $t("backToVenues") }}
      </NuxtLink>
      <h1 class="text-4xl font-bold text-gray-900 mt-4">
        {{ currentTag?.name }}
      </h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <VenueCard
        v-for="venue in venuesWithTag"
        :key="venue.id"
        :venue="venue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Venue, VenueTag } from "~/types/venue";

const route = useRoute();
const slug = route.params.slug as string;

// In production, these would come from an API
const availableTags: VenueTag[] = [
  { id: 1, name: "Svatba v přírodě", slug: "outdoor-wedding" },
  { id: 2, name: "Historické prostory", slug: "historical" },
  { id: 3, name: "U vody", slug: "waterfront" },
  { id: 4, name: "Moderní", slug: "modern" },
  { id: 5, name: "Rustikální", slug: "rustic" },
];

const currentTag = computed(() =>
  availableTags.find((tag) => tag.slug === slug)
);

// Sample venues data - in production, this would be filtered on the server
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

const venuesWithTag = computed(() =>
  venues.value.filter((venue) => venue.tags.some((tag) => tag.slug === slug))
);

useHead({
  title: currentTag.value?.name || "Tag",
  meta: [
    {
      name: "description",
      content: `Discover wedding venues tagged with ${currentTag.value?.name}`,
    },
  ],
});
</script>
