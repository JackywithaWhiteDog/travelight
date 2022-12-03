import axios from 'axios'
import { getRecommendationAPI } from './attractions'
import { Location } from '../types'
import { mockSelectableAttractionList, mockResponse } from './mockData'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const location: Location = {
  longitude: 121.421072,
  latitude: 25.085651
}

const resp = {
  data: mockResponse
}

test('Test getRecommendationAPI', async () => {
  mockedAxios.get.mockResolvedValue(resp)
  const data = await getRecommendationAPI(location, 4.5, 500)
  expect(data).toEqual(mockSelectableAttractionList)
})
