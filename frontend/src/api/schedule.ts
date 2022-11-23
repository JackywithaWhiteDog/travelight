import { StoreDispatch } from '../store'
import { reorderSchedule } from '../store/reducers/attractions'
import { Attraction, Order } from '../types'
import axios from 'axios'
import { generateMockOrder } from './mockData'

const API_ROOT = process.env.REACT_APP_API_ROOT ?? ''

export const optimizeScheduleAPI = async (schedule: Attraction[]): Promise<Order> => {
  const response = await axios.get(API_ROOT + '/optimize', {
    params: {
      data: schedule
    }
  })
  return (response.data as Order)
}

export const optimizeSchedule = async (schedule: Attraction[], dispatch: StoreDispatch): Promise<void> => {
  let order: Order
  if (API_ROOT !== '') {
    order = await optimizeScheduleAPI(schedule)
  } else {
    order = generateMockOrder(schedule)
  }
  dispatch(reorderSchedule(order.order))
}
