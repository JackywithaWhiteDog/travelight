import { StoreDispath } from '../store'
import { addRecommendation } from '../store/reducers/attractions'
import { Location, SelectableAttraction } from '../types'

export const getRecommendation = async (location: Location, dispath: StoreDispath): Promise<void> => {
  const mockData: SelectableAttraction[] = [
    {
      name: '台北車站',
      location: { longitude: 121.515336, latitude: 25.0462548 },
      placeId: '1234',
      rating: 4.1,
      isSelected: false
    },
    {
      name: '華山1914文化創意產業園區',
      location: { longitude: 121.5267377, latitude: 25.0445075 },
      placeId: '5678',
      rating: 4.4,
      isSelected: false
    },
    {
      name: '國家音樂廳',
      location: { longitude: 121.5176232, latitude: 25.037252 },
      placeId: '4123',
      rating: 4.7,
      isSelected: false
    },
    {
      name: '龍門客棧餃子館 (林森店)',
      location: { longitude: 121.5221428, latitude: 25.0396153 },
      placeId: '5682',
      rating: 4.4,
      isSelected: false
    },
    {
      name: '興波咖啡旗艦店',
      location: { longitude: 121.5271228, latitude: 25.0422281 },
      placeId: '3228',
      rating: 4.4,
      isSelected: false
    }
  ]
  dispath(addRecommendation(mockData))
}
