<template>
  <ClientOnly>
    <div class="h-full w-full">
      <l-map
        v-model="zoom"
        :center="[coordinates.lat, coordinates.lng]"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        />
        <l-marker :lat-lng="[coordinates.lat, coordinates.lng]" />
      </l-map>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css'

const props = defineProps<{
  coordinates: { lat: number; lng: number }
  zoom?: number
}>()

const zoom = ref(props.zoom || 13)
</script>

<style>
.leaflet-container {
  height: 100%;
  width: 100%;
}
</style>