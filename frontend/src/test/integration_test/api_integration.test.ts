import { getRecommendationAPI } from '../../api/attractions'
import { optimizeScheduleAPI } from '../../api/schedule'
import { Location } from '../../types'

const location: Location = {
  longitude: 121.5654268,
  latitude: 25.0329636
}// location of taipei city

test('Integration test for getRecommendationAPI and optimizeScheduleAPI', async () => {
  process.env.REACT_APP_API_ROOT = 'http://localhost:8080'
  const attractions = await getRecommendationAPI(location)
  expect(attractions).not.toBeNull()
  expect(attractions.length).not.toBe(0)
  attractions.forEach((attraction) => {
    expect(attraction.address).not.toBeNull()
    expect(attraction.comments).not.toBeNull()
    expect(attraction.isSelected).not.toBeNull()
    expect(attraction.constraint.closingTimes.length).toBe(7)
    expect(attraction.constraint.openingTimes.length).toBe(7)
    expect(attraction.constraint.stayTime).not.toBeNull()
    expect(attraction.location.latitude).not.toBeNull()
    expect(attraction.location.longitude).not.toBeNull()
    expect(attraction.name).not.toBeNull()
    expect(attraction.pictureURL).not.toBeNull()
    expect(attraction.placeId).not.toBeNull()
    expect(attraction.rating).not.toBeNull()
  })
  const nAttractions = (attractions.length > 10) ? 10 : attractions.length
  const slicedAttractions = attractions.slice(0, nAttractions)
  const order = await optimizeScheduleAPI(
    slicedAttractions,
    'driving',
    0,
    false
  )
  if (order.isValid) {
    expect(order.order.length).toBe(nAttractions)
    expect(order.arriveTimes.length).toBe(nAttractions)
    expect(order.leaveTimes.length).toBe(nAttractions)
    expect(order.idleTimes.length).toBe(nAttractions - 1)
    expect(order.transportationTimes.length).toBe(nAttractions - 1)
    expect(order.savedTime).not.toBeNull()
  }
  const reorderedAttractions = order.order.map((index) => slicedAttractions[index])
  const check = await optimizeScheduleAPI(
    reorderedAttractions,
    'driving',
    0,
    true
  )
  if (check.isValid) {
    expect(check.arriveTimes.length).toBe(nAttractions)
    expect(check.leaveTimes.length).toBe(nAttractions)
    expect(check.idleTimes.length).toBe(nAttractions - 1)
    expect(check.transportationTimes.length).toBe(nAttractions - 1)
    expect(check.savedTime).not.toBeNull()
  }
  console.log(check)
})
