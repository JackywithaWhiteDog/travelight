import { Attraction, SelectableAttraction } from '../types'

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
    placeId, rating, name, constraint, address, pictureURL, geoLocation, comments
  }): SelectableAttraction => ({
    placeId,
    rating,
    name,
    constraint,
    location: geoLocation,
    address,
    pictureURL: photoReferenceToUrl(pictureURL),
    isSelected: false,
    comments
  }))(data)
}
