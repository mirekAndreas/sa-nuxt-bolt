<template>
  <div class="space-y-6">
    <!-- Subscription Status -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">{{ $t('profile.subscriptionStatus') }}</h2>
        <span 
          :class="[
            'px-3 py-1 rounded-full text-sm font-medium',
            isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          ]"
        >
          {{ isActive ? $t('profile.active') : $t('profile.inactive') }}
        </span>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 bg-gray-50 rounded-lg">
          <div class="text-sm text-gray-600">{{ $t('profile.tier') }}</div>
          <div class="text-lg font-semibold">{{ profile.subscriptionTier }}</div>
        </div>
        
        <div class="p-4 bg-gray-50 rounded-lg">
          <div class="text-sm text-gray-600">{{ $t('profile.startDate') }}</div>
          <div class="text-lg font-semibold">
            {{ new Date(profile.subscriptionStartDate).toLocaleDateString() }}
          </div>
        </div>
        
        <div class="p-4 bg-gray-50 rounded-lg">
          <div class="text-sm text-gray-600">{{ $t('profile.daysLeft') }}</div>
          <div class="text-lg font-semibold">{{ daysLeft }}</div>
        </div>
      </div>
    </div>

    <!-- Analytics Overview -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4">{{ $t('profile.analytics') }}</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="p-4 bg-gray-50 rounded-lg">
          <div class="text-sm text-gray-600">{{ $t('profile.totalViews') }}</div>
          <div class="text-2xl font-semibold">{{ profile.analytics.views }}</div>
        </div>
        
        <div class="p-4 bg-gray-50 rounded-lg">
          <div class="text-sm text-gray-600">{{ $t('profile.totalInquiries') }}</div>
          <div class="text-2xl font-semibold">{{ profile.analytics.inquiries }}</div>
        </div>
        
        <div class="p-4 bg-gray-50 rounded-lg">
          <div class="text-sm text-gray-600">{{ $t('profile.conversionRate') }}</div>
          <div class="text-2xl font-semibold">
            {{ (profile.analytics.conversionRate * 100).toFixed(1) }}%
          </div>
        </div>
        
        <div class="p-4 bg-gray-50 rounded-lg">
          <div class="text-sm text-gray-600">{{ $t('profile.popularityScore') }}</div>
          <div class="text-2xl font-semibold">{{ profile.analytics.popularityScore }}</div>
        </div>
      </div>

      <!-- Monthly Stats Chart -->
      <ProfileAnalyticsChart :stats="profile.analytics.monthlyStats" />
    </div>

    <!-- Subscription Management -->
    <div v-if="profile.subscriptionTier === 'free'" class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4">{{ $t('profile.upgradeToPremium') }}</h2>
      <div class="flex items-center justify-between">
        <div class="space-y-2">
          <p class="text-gray-600">{{ $t('profile.premiumBenefits') }}</p>
          <ul class="list-disc list-inside text-sm text-gray-600">
            <li>{{ $t('profile.benefit1') }}</li>
            <li>{{ $t('profile.benefit2') }}</li>
            <li>{{ $t('profile.benefit3') }}</li>
          </ul>
        </div>
        <button
          @click="upgradeToPremium"
          class="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
        >
          {{ $t('profile.upgradeNow') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VenueProfile } from '~/types/profile'
import { useProfileStore } from '~/stores/profile'

const props = defineProps<{
  profile: VenueProfile
}>()

const store = useProfileStore()
const isActive = computed(() => store.isProfileActive)
const daysLeft = computed(() => store.subscriptionDaysLeft)

const upgradeToPremium = () => {
  store.updateSubscription('premium', 30) // Upgrade to 30 days premium
}
</script>