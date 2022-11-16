import { StoreDispath } from '../store'
import { addRecommendation } from '../store/reducers/attractions'
import { Location, SelectableAttraction } from '../types'

export const getRecommendation = async (location: Location, dispath: StoreDispath): Promise<void> => {
  const mockData: SelectableAttraction[] = [
    {
      name: 'ABC',
      location: { longitude: 121.647412, latitude: 25.1241861 },
      placeId: '1234',
      priceLevel: 4,
      rating: 2,
      isSelected: false
    },
    {
      name: 'DEF',
      location: { longitude: 121.421072, latitude: 25.085651 },
      placeId: '5678',
      priceLevel: 5,
      rating: 3,
      isSelected: false
    }
  ]
  dispath(addRecommendation(mockData))
}
