export type SubscriptionTier = 'free' | 'premium'

export interface VenueProfile {
  id: number
  userId: number
  venueId: number
  subscriptionTier: SubscriptionTier
  subscriptionStartDate: string
  subscriptionEndDate: string | null
  isActive: boolean
  analytics: VenueAnalytics
}

export interface VenueAnalytics {
  views: number
  inquiries: number
  conversionRate: number
  popularityScore: number
  monthlyStats: MonthlyStats[]
}

export interface MonthlyStats {
  month: string
  views: number
  inquiries: number
  conversionRate: number
}