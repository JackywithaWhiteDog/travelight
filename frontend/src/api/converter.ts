import { Attraction, SelectableAttraction, Location, Constraint } from '../types'

export const photoReferenceToUrl = (pictureReference: string): string => {
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  let url
  if (API_KEY !== undefined) {
    url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${pictureReference}&key=${API_KEY}`
  } else {
    url = pictureReference
  }
  return url
}

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
    pictureURL: photoReferenceToUrl(pictureURL),
    isSelected: false
  }))(data) as SelectableAttraction
}
