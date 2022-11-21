import { StoreDispatch } from '../store'
import { reorderSchedule } from '../store/reducers/attractions'
import { Attraction } from '../types'

export const optimizeSchedule = async (schedule: Attraction[], dispatch: StoreDispatch): Promise<void> => {
  const order = Array.from(Array(schedule.length).keys()).sort(() => Math.random() - 0.5)
  dispatch(reorderSchedule(order))
}
