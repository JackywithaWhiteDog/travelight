import { StoreDispatch } from '../store'
import { reorderSchedule } from '../store/reducers/attractions'
import { Attraction, Order } from '../types'
import { generateMockOrder } from './mockData'

export const optimizeSchedule = async (schedule: Attraction[], dispatch: StoreDispatch): Promise<void> => {
  const order: Order = generateMockOrder(schedule)
  dispatch(reorderSchedule(order.order))
}
