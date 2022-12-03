import { StoreDispatch } from '../store'
import { addAttractions } from '../store/reducers/attractions'
import { Location, SelectableAttraction } from '../types'
import axios from 'axios'
import { mockSelectableAttractionList } from './mockData'
import { apiFormatToSelectableAttraction } from './converter'

const API_ROOT = process.env.REACT_APP_API_ROOT ?? ''

export const getRecommendationAPI = async (location: Location, minRating: number, minComments: number): Promise<SelectableAttraction[]> => {
  const response = await axios.get(API_ROOT + '/nearbyAttractions', {
    params: {
      longtitude: location.longitude,
      latitude: location.latitude,
      minRating,
      minComments
    }
  })
  const rawdata = response.data
  return rawdata.map(apiFormatToSelectableAttraction)
}

export const getRecommendation = async (location: Location, minRating: number, minComments: number, dispatch: StoreDispatch): Promise<void> => {
  let data: SelectableAttraction[]
  console.log(API_ROOT)
  console.log(minRating, minComments)
  if (API_ROOT !== '') {
    data = await getRecommendationAPI(location, minRating, minComments)
  } else {
    data = mockSelectableAttractionList
  }
  dispatch(addAttractions(data))
}
