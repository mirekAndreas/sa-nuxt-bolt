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
import type { Venue, VenueFilters } from "~/types/venue";

definePageMeta({
  layout: "default",
});

// Sample venues data
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
  },
  {
    id: 3,
    name: "Villa Richter",
    type: "venue",
    capacity: 200,
    country: "Czech Republic",
    city: "Praha",
    address: "Staré zámecké schody 251/6, Praha 1",
    description: "Historická vila s výhledem na Prahu a vinicí",
    images: [
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3",
    ],
    coordinates: { lat: 50.0908, lng: 14.4031 },
    contactEmail: "events@villarichter.cz",
    contactPhone: "+420234567890",
    priceRange: { min: 2500, max: 6000 },
  },
  {
    id: 4,
    name: "Svatební Catering Praha",
    type: "catering",
    capacity: 300,
    country: "Czech Republic",
    city: "Praha",
    address: "Vinohradská 1233/22, Praha 2",
    description: "Profesionální cateringové služby pro vaši svatbu",
    images: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3",
    ],
    coordinates: { lat: 50.0755, lng: 14.4378 },
    contactEmail: "info@svatebnicatering.cz",
    contactPhone: "+420777111222",
    priceRange: { min: 800, max: 2000 },
  },
  {
    id: 5,
    name: "Svatební Fotograf Jan",
    type: "photographer",
    capacity: null,
    country: "Czech Republic",
    city: "Brno",
    address: "Veveří 222, Brno",
    description: "Zachytím nejkrásnější momenty vašeho velkého dne",
    images: [
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3",
    ],
    coordinates: { lat: 49.1951, lng: 16.6068 },
    contactEmail: "jan@svatebnifotak.cz",
    contactPhone: "+420608123456",
    priceRange: { min: 20000, max: 35000 },
  },
]);

const filters = ref<VenueFilters>({});

const updateFilters = (newFilters: VenueFilters) => {
  filters.value = newFilters;
};

const filteredVenues = computed(() => {
  return venues.value.filter((venue) => {
    if (filters.value.country && venue.country !== filters.value.country)
      return false;
    if (filters.value.type && venue.type !== filters.value.type) return false;
    if (
      filters.value.minCapacity &&
      venue.capacity &&
      venue.capacity < filters.value.minCapacity
    )
      return false;
    if (
      filters.value.maxCapacity &&
      venue.capacity &&
      venue.capacity > filters.value.maxCapacity
    )
      return false;
    return true;
  });
});
</script>
