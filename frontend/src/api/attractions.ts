import { StoreDispatch } from '../store'
import { addRecommendation } from '../store/reducers/attractions'
import { Constraint, Location, SelectableAttraction } from '../types'
import axios from 'axios'

const API_ROOT = 'http://localhost:4000/api'

export const getRecommendationAPI = async (location: Location): Promise<SelectableAttraction[]> => {
  const response = await axios.get(API_ROOT + '/nearbyAttractions', {
    params: {
      longtitude: location.longitude,
      latitude: location.latitude
    }
  })
  const rawdata = response.data
  const data: SelectableAttraction[] = []
  rawdata.forEach((rawElement: any) => {
    const element: SelectableAttraction = {
      placeId: rawElement.placeId as string,
      rating: rawElement.rating as number,
      name: rawElement.name as string,
      location: rawElement.location as Location,
      constraint: rawElement.constraint as Constraint,
      address: rawElement.address as string,
      pictureURL: rawElement.pictureURL as string,
      isSelected: false
    }
    data.push(element)
  })
  return data
}

export const getRecommendation = async (location: Location, dispatch: StoreDispatch): Promise<void> => {
  const data = await getRecommendationAPI(location)
  dispatch(addRecommendation(data))
}
