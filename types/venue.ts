export interface Venue {
  id: number
  name: string
  type: VenueType
  capacity: number
  country: string
  city: string
  address: string
  description: string
  images: string[]
  coordinates: {
    lat: number
    lng: number
  }
  contactEmail: string
  contactPhone: string
  priceRange: {
    min: number
    max: number
  }
}

export type VenueType = 'venue' | 'catering' | 'photographer' | 'music' | 'decoration'

export interface VenueFilters {
  country?: string
  type?: VenueType
  minCapacity?: number
  maxCapacity?: number
}