export interface Location {
  longitude: number
  latitude: number
}

export interface Region {
  name: string
  location: Location
}

export interface Attraction extends Region {
  placeId: string
  priceLevel: number
  rating: number
}

export interface SelectableAttraction extends Attraction {
  isSelected: boolean
}
