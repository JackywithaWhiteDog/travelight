import axios from 'axios'
import { optimizeScheduleAPI } from '../../api/schedule'
import { mockSelectableAttractionList, generateMockOrder } from '../mockData'
import { Order } from '../../types'
import { attractionToApiFormat } from '../../api/converter'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockOrder: Order = generateMockOrder(mockSelectableAttractionList.map(attractionToApiFormat))

const resp = {
  data: mockOrder
}

test('Test optimizeScheduleAPI', async () => {
  mockedAxios.post.mockResolvedValue(resp)
  const data = await optimizeScheduleAPI(mockSelectableAttractionList, 'transit', 0, false)
  expect(data).toEqual(mockOrder)
})
