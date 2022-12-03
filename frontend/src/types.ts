export interface Location {
  longitude: number
  latitude: number
}

export interface Region {
  name: string
  location: Location
}

export interface Constraint {
  openingTimes: number[]
  closingTimes: number[]
  stayTime: number
  transportation: string
}

export interface Attraction extends Region {
  placeId: string
  constraint: Constraint
  rating: number
  address: string
  pictureURL: string
  comments: number
}

export interface SelectableAttraction extends Attraction {
  isSelected: boolean
}

export interface Order {
  order: number[]
  arriveTimes: number[]
  leaveTimes: number[]
  transportationTimes: number[]
  idleTimes: number[]
  savedTime: number
  isValid: boolean
}

export type Transportation = 'driving' | 'bicycling' | 'transit' | 'walking'

export interface Setting {
  transportation: Transportation
  departureDay: number
  minRating: number
  minComments: number
}
