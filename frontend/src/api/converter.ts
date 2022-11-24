import { Attraction, SelectableAttraction, Location, Constraint } from '../types'

export const attractionToApiFormat = (attraction: Attraction): any => {
  return (({
    placeId, rating, name, location, constraint, address, pictureURL
  }) => ({
    placeId, rating, name, geoLocation: location, constraint, address, pictureURL
  }))(attraction)
}

export const apiFormatToSelectableAttraction = (data: any): SelectableAttraction => {
  return (({
    placeId, rating, name, constraint, address, pictureURL, geoLocation
  }) => ({
    placeId: placeId as string,
    rating: rating as number,
    name: name as string,
    constraint: constraint as Constraint,
    location: geoLocation as Location,
    address: address as string,
    pictureURL: pictureURL as string,
    isSelected: false
  }))(data) as SelectableAttraction
}
