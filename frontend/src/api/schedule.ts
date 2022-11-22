import { StoreDispatch } from '../store'
import { reorderSchedule } from '../store/reducers/attractions'
import { Attraction, Order } from '../types'
import axios from 'axios'

const API_ROOT = 'http://localhost:4000/api'

export const optimizeScheduleAPI = async (schedule: Attraction[]): Promise<Order> => {
  const response = await axios.get(API_ROOT + '/optimize', {
    params: {
      data: schedule
    }
  })
  return (response.data as Order)
}

export const optimizeSchedule = async (schedule: Attraction[], dispatch: StoreDispatch): Promise<void> => {
  const order: Order = await optimizeScheduleAPI(schedule)
  dispatch(reorderSchedule(order.order))
}
