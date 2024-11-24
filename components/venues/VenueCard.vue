<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden"
    :class="{
      'border-2 border-primary': isPremium,
      'border border-gray-200': !isPremium,
    }"
  >
    <div class="relative h-48">
      <img
        :src="venue.images[0]"
        :alt="venue.name"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm"
      >
        {{ venue.type }}
      </div>
      <div
        v-if="isPremium"
        class="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded-full text-sm"
      >
        {{ $t("subscription.premium") }}
      </div>
    </div>
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-2">{{ venue.name }}</h3>
      <div class="flex items-center text-gray-600 mb-2">
        <IconLocation class="w-4 h-4 mr-1" />
        {{ venue.city }}, {{ venue.country }}
      </div>
      <div class="flex items-center text-gray-600 mb-2">
        {{ venue.capacity }} {{ $t("guests") }}
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <NuxtLink
          v-for="tag in venue.tags"
          :key="tag.id"
          :to="`/tags/${tag.slug}`"
          class="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200"
        >
          {{ tag.name }}
        </NuxtLink>
      </div>

      <div class="flex gap-2 mb-4">
        <NuxtLink
          :to="`/profile/${venue.id}`"
          class="flex items-center text-sm text-gray-600 hover:text-primary"
        >
          {{ $t("profile") }}
        </NuxtLink>
      </div>

      <div class="flex items-center justify-between mb-4">
        <span
          class="text-sm"
          :class="{
            'text-primary font-semibold': venue.subscription.tier === 'premium',
            'text-gray-600': venue.subscription.tier !== 'premium',
          }"
        >
          {{ $t(`subscription.${venue.subscription.tier}`) }}
        </span>
        <span v-if="venue.subscription.validTo" class="text-sm text-gray-500">
          {{ $t("subscription.validUntil") }}:
          {{ formatDate(venue.subscription.validTo) }}
        </span>
      </div>

      <NuxtLink
        :to="`/venues/${venue.id}`"
        class="block w-full text-center bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
      >
        {{ $t("viewDetails") }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Venue } from "~/types/venue";

const props = defineProps<{
  venue: Venue;
}>();

const { t } = useI18n();

const isPremium = computed(() => props.venue.subscription.tier === "premium");

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};
</script>
