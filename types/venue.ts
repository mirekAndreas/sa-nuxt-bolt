export interface Venue {
  id: number
  name: string
  type?: string
  capacity?: number
  country?: string
  city?: string
  address?: string
  description?: string
  images: string[]
  coordinates?: {
    lat: number
    lng: number
  }
  contactEmail?: string
  contactPhone?: string
  priceRange?: {
    min: number
    max: number
  }
  tags?: Array<{
    id: number
    name: string
    slug: string
  }>
  subscription?: {
    tier: 'premium' | 'member' | 'free'
    validFrom?: string
    validTo?: string
    price?: number
  }
}

export interface VenueFilters {
  search?: string
  tags?: string[]
  country?: string
  type?: string
  minCapacity?: number
  maxCapacity?: number
}