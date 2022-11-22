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
  closeTimes: number[]
  stayTime: number
  transportation: string
}

export interface Attraction extends Region {
  placeId: string
  constraint: Constraint
  rating: number
  address: string
}

export interface SelectableAttraction extends Attraction {
  isSelected: boolean
}

export interface Order {
  order: number[]
  arrivalTimes: number[]
  leaveTimes: number[]
  isValid: boolean
}
