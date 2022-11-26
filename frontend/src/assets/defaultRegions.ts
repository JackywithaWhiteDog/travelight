import { Location } from '../types'

const defaultRegions: ({ [key: string]: { name: string, location: Location } }) = {
  'keelung-city': {
    name: '基隆市',
    location: { longitude: 121.647412, latitude: 25.1241861 }
  },
  'taipei-city': {
    name: '台北市',
    location: { longitude: 121.421072, latitude: 25.085651 }
  }
}
export default defaultRegions
// @TODO: complete the the list of regions
