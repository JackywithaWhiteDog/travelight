import { StoreDispatch } from '../store'
import { addAttractions } from '../store/reducers/attractions'
import { Location, SelectableAttraction } from '../types'
import axios from 'axios'
import { mockSelectableAttractionList } from '../test/mockData'
import { apiFormatToSelectableAttraction } from './converter'

export const getRecommendationAPI = async (location: Location): Promise<SelectableAttraction[]> => {
  const API_ROOT = process.env.REACT_APP_API_ROOT ?? ''
  const response = await axios.get(API_ROOT + '/nearbyAttractions', {
    params: {
      longitude: location.longitude,
      latitude: location.latitude
    }
  })
  const rawdata = response.data
  return rawdata.map(apiFormatToSelectableAttraction)
}

export const getRecommendation = async (location: Location, dispatch: StoreDispatch): Promise<void> => {
  const API_ROOT = process.env.REACT_APP_API_ROOT ?? ''
  let data: SelectableAttraction[]
  if (API_ROOT !== '') {
    data = await getRecommendationAPI(location)
  } else {
    data = mockSelectableAttractionList
  }
  dispatch(addAttractions(data))
}
