import { StoreDispatch } from '../store'
import { setDefaultRegions } from '../store/reducers/attractions'
import { Region } from '../types'

export const getDefaultRegions = async (dispatch: StoreDispatch): Promise<void> => {
  const mockData: Region[] = [
    {
      name: '基隆市',
      location: { longitude: 121.647412, latitude: 25.1241861 }
    },
    {
      name: '台北市',
      location: { longitude: 121.421072, latitude: 25.085651 }
    }
  ]
  dispatch(setDefaultRegions(mockData))
}
