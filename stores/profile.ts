import { defineStore } from 'pinia'
import type { VenueProfile, SubscriptionTier } from '~/types/profile'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profiles: [] as VenueProfile[],
    currentProfile: null as VenueProfile | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    isProfileActive(): boolean {
      if (!this.currentProfile) return false
      const now = new Date()
      const endDate = this.currentProfile.subscriptionEndDate 
        ? new Date(this.currentProfile.subscriptionEndDate)
        : null
      return this.currentProfile.isActive && (!endDate || endDate > now)
    },

    subscriptionDaysLeft(): number {
      if (!this.currentProfile?.subscriptionEndDate) return 0
      const now = new Date()
      const endDate = new Date(this.currentProfile.subscriptionEndDate)
      const diffTime = endDate.getTime() - now.getTime()
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    },
  },

  actions: {
    async fetchProfile(profileId: number) {
      this.loading = true
      try {
        // API call would go here
        const response = await fetch(`/api/profiles/${profileId}`)
        const data = await response.json()
        this.currentProfile = data
      } catch (err) {
        this.error = 'Failed to fetch profile'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async updateSubscription(tier: SubscriptionTier, duration: number) {
      if (!this.currentProfile) return

      try {
        const startDate = new Date()
        const endDate = new Date()
        endDate.setDate(endDate.getDate() + duration)

        // API call would go here
        const response = await fetch(`/api/profiles/${this.currentProfile.id}/subscription`, {
          method: 'PUT',
          body: JSON.stringify({
            tier,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          }),
        })

        const data = await response.json()
        this.currentProfile = {
          ...this.currentProfile,
          subscriptionTier: tier,
          subscriptionStartDate: startDate.toISOString(),
          subscriptionEndDate: endDate.toISOString(),
        }
      } catch (err) {
        this.error = 'Failed to update subscription'
        console.error(err)
      }
    },
  },
})