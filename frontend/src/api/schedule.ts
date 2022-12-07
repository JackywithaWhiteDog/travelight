import { StoreDispatch } from '../store'
import { reorderSchedule, setOrder, emptyOrder } from '../store/reducers/attractions'
import { Attraction, Order, Transportation } from '../types'
import axios from 'axios'
import { generateMockOrder } from './mockData'
import { attractionToApiFormat } from './converter'

const API_ROOT = process.env.REACT_APP_API_ROOT ?? ''

export const optimizeScheduleAPI = async (schedule: Attraction[], transportation: Transportation, departureDay: number, check: boolean): Promise<Order> => {
  const response = await axios.post(API_ROOT + '/optimize', {
    attractions: schedule.map(attractionToApiFormat),
    departureDay,
    check,
    transportation
  })
  return (response.data as Order)
}

export const optimizeSchedule = async (schedule: Attraction[], transportation: Transportation, departureDay: number, check: boolean, dispatch: StoreDispatch): Promise<void> => {
  let order: Order
  if (API_ROOT !== '') {
    order = await optimizeScheduleAPI(schedule, transportation, departureDay, check)
  } else {
    order = generateMockOrder(schedule)
  }

  if (order.isValid) {
    dispatch(setOrder(order))
  } else {
    dispatch(setOrder(emptyOrder))
  }
  if (!check && order.isValid) {
    dispatch(reorderSchedule({ indices: order.order, reorderByDragging: false }))
  }
}
