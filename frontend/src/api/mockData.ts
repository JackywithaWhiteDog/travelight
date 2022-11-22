import { Order, Attraction, SelectableAttraction } from '../types'
export const mockSelectableAttractionList: SelectableAttraction[] = [
  {
    name: '台北車站',
    location: { longitude: 121.515336, latitude: 25.0462548 },
    placeId: '1234',
    rating: 4.1,
    isSelected: false,
    constraint: {
      openingTimes: [
        8
      ],
      closingTimes: [
        17
      ],
      stayTime: 1,
      transportation: 'driving'
    },
    address: '100台北市中正區',
    pictureURL: ''
  },
  {
    name: '華山1914文化創意產業園區',
    location: { longitude: 121.5267377, latitude: 25.0445075 },
    placeId: '5678',
    rating: 4.4,
    isSelected: false,
    constraint: {
      openingTimes: [
        8
      ],
      closingTimes: [
        17
      ],
      stayTime: 1,
      transportation: 'driving'
    },
    address: '100台北市中正區八德路一段1號',
    pictureURL: ''
  },
  {
    name: '國家音樂廳',
    location: { longitude: 121.5176232, latitude: 25.037252 },
    placeId: '4123',
    rating: 4.7,
    isSelected: false,
    constraint: {
      openingTimes: [
        8
      ],
      closingTimes: [
        17
      ],
      stayTime: 1,
      transportation: 'driving'
    },
    address: '100台北市中正區中山南路21-1號',
    pictureURL: ''
  },
  {
    name: '龍門客棧餃子館 (林森店)',
    location: { longitude: 121.5221428, latitude: 25.0396153 },
    placeId: '5682',
    rating: 4.4,
    isSelected: false,
    constraint: {
      openingTimes: [
        8
      ],
      closingTimes: [
        17
      ],
      stayTime: 1,
      transportation: 'driving'
    },
    address: '100台北市中正區林森南路61巷19號',
    pictureURL: ''
  },
  {
    name: '興波咖啡旗艦店',
    location: { longitude: 121.5271228, latitude: 25.0422281 },
    placeId: '3228',
    rating: 4.4,
    isSelected: false,
    constraint: {
      openingTimes: [
        8
      ],
      closingTimes: [
        17
      ],
      stayTime: 1,
      transportation: 'driving'
    },
    address: '100台北市中正區忠孝東路二段27號',
    pictureURL: ''
  }
]

export const generateMockOrder = (schedule: Attraction[]): Order => {
  const arriveTimes = Array.from(Array(schedule.length).keys()).map(x => 8 + x * 3)
  const leaveTimes = arriveTimes.map(x => x + 1)
  const order: Order = {
    order: Array.from(Array(schedule.length).keys()).sort(() => Math.random() - 0.5),
    arriveTimes,
    leaveTimes,
    isValid: false
  }
  return order
}