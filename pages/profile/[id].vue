<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">{{ $t('profile.dashboard') }}</h1>
    
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <div v-else-if="error" class="bg-red-50 text-red-800 p-4 rounded-lg">
      {{ error }}
    </div>

    <ProfileDashboard
      v-else-if="profile"
      :profile="profile"
    />
  </div>
</template>

<script setup lang="ts">
import { useProfileStore } from '~/stores/profile'

const route = useRoute()
const store = useProfileStore()

const profile = computed(() => store.currentProfile)
const loading = computed(() => store.loading)
const error = computed(() => store.error)

onMounted(async () => {
  await store.fetchProfile(parseInt(route.params.id as string))
})</script>