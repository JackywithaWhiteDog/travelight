import { Order, Attraction, SelectableAttraction, Constraint } from '../types'
import { photoReferenceToUrl } from '../api/converter'

const openingTimes: number[] = Array.from(Array(7).keys()).map(x => 8)
const closingTimes: number[] = Array.from(Array(7).keys()).map(x => 19)
const constraint: Constraint = {
  openingTimes,
  closingTimes,
  stayTime: 1,
  transportation: 'driving'
}

const photoReference = 'CnRvAAAAwMpdHeWlXl-lH0vp7lez4znKPIWSWvgvZFISdKx45AwJVP1Qp37YOrH7sqHMJ8C-vBDC546decipPHchJhHZL94RcTUfPa1jWzo-rSHaTlbNtjh-N68RkcToUCuY9v2HNpo5mziqkir37WU8FJEqVBIQ4k938TI3e7bf8xq-uwDZcxoUbO_ZJzPxremiQurAYzCTwRhE_V0'

const pictureURL = (process.env.REACT_APP_GOOGLE_MAPS_API_KEY === undefined)
  ? 'https://pic.pimg.tw/anrine910070/1591550218-3199929553.jpg?fbclid=IwAR3ZMYFhHWd55JsFHi7C-15cS5mV7K985WarlLJF-RhVO4PUbhEAIlZxQOI'
  : photoReferenceToUrl(photoReference)

export const mockSelectableAttractionList: SelectableAttraction[] = [
  {
    name: '台北車站',
    location: { longitude: 121.515336, latitude: 25.0462548 },
    placeId: '1234',
    rating: 4.6,
    isSelected: false,
    constraint,
    address: '100台北市中正區',
    pictureURL,
    comments: 100
  },
  {
    name: '華山1914文化創意產業園區',
    location: { longitude: 121.5267377, latitude: 25.0445075 },
    placeId: '5678',
    rating: 4.4,
    isSelected: false,
    constraint,
    address: '100台北市中正區八德路一段1號',
    pictureURL,
    comments: 200
  },
  {
    name: '國家音樂廳',
    location: { longitude: 121.5176232, latitude: 25.037252 },
    placeId: '4123',
    rating: 4.7,
    isSelected: false,
    constraint,
    address: '100台北市中正區中山南路21-1號',
    pictureURL,
    comments: 300
  },
  {
    name: '龍門客棧餃子館 (林森店)',
    location: { longitude: 121.5221428, latitude: 25.0396153 },
    placeId: '5682',
    rating: 3.7,
    isSelected: false,
    constraint,
    address: '100台北市中正區林森南路61巷19號',
    pictureURL,
    comments: 400
  },
  {
    name: '興波咖啡旗艦店',
    location: { longitude: 121.5271228, latitude: 25.0422281 },
    placeId: '3228',
    rating: 3.2,
    isSelected: false,
    constraint,
    address: '100台北市中正區忠孝東路二段27號',
    pictureURL,
    comments: 500
  },
  {
    name: 'Cafe de Gear',
    location: { longitude: 121.5190802, latitude: 25.0322581 },
    placeId: '32348',
    rating: 2.1,
    isSelected: false,
    constraint,
    address: '100台北市中正區寧波東街3-3號',
    pictureURL,
    comments: 10
  }
]

export const mockResponse: any[] = [
  {
    name: '台北車站',
    geoLocation: { longitude: 121.515336, latitude: 25.0462548 },
    placeId: '1234',
    rating: 4.6,
    isSelected: false,
    constraint,
    address: '100台北市中正區',
    pictureURL,
    comments: 100
  },
  {
    name: '華山1914文化創意產業園區',
    geoLocation: { longitude: 121.5267377, latitude: 25.0445075 },
    placeId: '5678',
    rating: 4.4,
    isSelected: false,
    constraint,
    address: '100台北市中正區八德路一段1號',
    pictureURL,
    comments: 200
  },
  {
    name: '國家音樂廳',
    geoLocation: { longitude: 121.5176232, latitude: 25.037252 },
    placeId: '4123',
    rating: 4.7,
    isSelected: false,
    constraint,
    address: '100台北市中正區中山南路21-1號',
    pictureURL,
    comments: 300
  },
  {
    name: '龍門客棧餃子館 (林森店)',
    geoLocation: { longitude: 121.5221428, latitude: 25.0396153 },
    placeId: '5682',
    rating: 3.7,
    isSelected: false,
    constraint,
    address: '100台北市中正區林森南路61巷19號',
    pictureURL,
    comments: 400
  },
  {
    name: '興波咖啡旗艦店',
    geoLocation: { longitude: 121.5271228, latitude: 25.0422281 },
    placeId: '3228',
    rating: 3.2,
    isSelected: false,
    constraint,
    address: '100台北市中正區忠孝東路二段27號',
    pictureURL,
    comments: 500
  },
  {
    name: 'Cafe de Gear',
    geoLocation: { longitude: 121.5190802, latitude: 25.0322581 },
    placeId: '32348',
    rating: 2.1,
    isSelected: false,
    constraint,
    address: '100台北市中正區寧波東街3-3號',
    pictureURL,
    comments: 10
  }
]

export const generateMockOrder = (schedule: Attraction[]): Order => {
  const arriveTimes = Array.from(Array(schedule.length).keys()).map(x => 8 + x * 3)
  const leaveTimes = arriveTimes.map(x => x + 1)
  const transportationTimes = (schedule.length === 0) ? [] : Array(schedule.length - 1).fill(1.5)
  const idleTimes = (schedule.length === 0) ? [] : Array(schedule.length - 1).fill(0.5)
  const savedTime = 1
  const order: Order = {
    order: Array.from(Array(schedule.length).keys()).sort(() => Math.random() - 0.5),
    arriveTimes,
    leaveTimes,
    transportationTimes,
    idleTimes,
    savedTime,
    isValid: true
  }
  return order
}
