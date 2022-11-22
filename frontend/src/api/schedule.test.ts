import axios from 'axios'
import { optimizeScheduleAPI } from './schedule'
import { mockSelectableAttractionList, generateMockOrder } from './mockData'
import { Order } from '../types'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockOrder: Order = generateMockOrder(mockSelectableAttractionList)

const resp = {
  data: mockOrder
}

test('Test optimizeScheduleAPI', async () => {
  mockedAxios.get.mockRejectedValue('Network error: Something went wrong')
  mockedAxios.get.mockResolvedValue(resp)
  const data = await optimizeScheduleAPI(mockSelectableAttractionList)
  expect(data).toEqual(mockOrder)
})
