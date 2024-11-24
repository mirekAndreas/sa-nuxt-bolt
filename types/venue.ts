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
  tags: VenueTag[]
  subscription: VenueSubscription
}

export interface VenueSubscription {
  tier: SubscriptionTier
  validFrom: string
  validTo: string | null
  price?: number
}

export type SubscriptionTier = 'free' | 'member' | 'premium'

export interface VenueTag {
  id: number
  name: string
  slug: string
}

export type VenueType = 'venue' | 'catering' | 'photographer' | 'music' | 'decoration'

export interface VenueFilters {
  country?: string
  type?: VenueType
  minCapacity?: number
  maxCapacity?: number
  tags?: string[]
  search?: string
}