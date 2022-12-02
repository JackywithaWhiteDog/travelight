import { Attraction, SelectableAttraction, Location, Constraint } from '../types'

export const attractionToApiFormat = (attraction: Attraction): any => {
  return (({
    placeId, rating, name, location, constraint, address, pictureURL
  }) => ({
    placeId, rating, name, geoLocation: location, constraint, address, pictureURL
  }))(attraction)
}

export const apiFormatToSelectableAttraction = async (data: any): Promise<SelectableAttraction> => {
  return (({
    placeId, rating, name, constraint, address, pictureURL, geoLocation
  }) => ({
    placeId: placeId as string,
    rating: rating as number,
    name: name as string,
    constraint: constraint as Constraint,
    location: geoLocation as Location,
    address: address as string,
    pictureURL: (process.env.REACT_APP_GOOGLE_MAPS_API_KEY === undefined)
      ? pictureURL
      : getPicture('Aap_uEA7vb0DDYVJWEaX3O-AtYp77AaswQKSGtDaimt3gt7QCNpdjp1BkdM6acJ96xTec3tsV_ZJNL_JP-lqsVxydG3nh739RE_hepOOL05tfJh2_ranjMadb3VoBYFvF0ma6S24qZ6QJUuV6sSRrhCskSBP5C1myCzsebztMfGvm7ij3gZT'),
    isSelected: false
  }))(data) as SelectableAttraction
}
