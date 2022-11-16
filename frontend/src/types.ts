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
  rating: number
}

export interface SelectableAttraction extends Attraction {
  isSelected: boolean
}
