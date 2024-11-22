import { defineStore } from 'pinia'
import type { Venue, VenueFilters } from '~/types/venue'

export const useVenueStore = defineStore('venue', {
  state: () => ({
    venues: [] as Venue[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    filteredVenues: (state) => (filters: VenueFilters) => {
      return state.venues.filter(venue => {
        if (filters.country && venue.country !== filters.country) return false
        if (filters.type && venue.type !== filters.type) return false
        if (filters.minCapacity && venue.capacity < filters.minCapacity) return false
        if (filters.maxCapacity && venue.capacity > filters.maxCapacity) return false
        return true
      })
    }
  },

  actions: {
    async fetchVenues() {
      this.loading = true
      try {
        // This would be an API call in production
        const response = await fetch('/api/venues')
        const data = await response.json()
        this.venues = data
      } catch (err) {
        this.error = 'Failed to fetch venues'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async fetchVenueById(id: number) {
      try {
        // This would be an API call in production
        const response = await fetch(`/api/venues/${id}`)
        const data = await response.json()
        return data
      } catch (err) {
        this.error = 'Failed to fetch venue'
        console.error(err)
        return null
      }
    }
  }
})