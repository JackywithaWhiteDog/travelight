import { StoreDispatch } from '../store'
import { addRecommendation } from '../store/reducers/attractions'
import { Location, SelectableAttraction } from '../types'
import { mockSelectableAttractionList } from './mockData'

export const getRecommendation = async (location: Location, dispatch: StoreDispatch): Promise<void> => {
  const mockData: SelectableAttraction[] = mockSelectableAttractionList
  dispatch(addRecommendation(mockData))
}
