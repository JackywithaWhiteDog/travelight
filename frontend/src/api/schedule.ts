import { StoreDispath } from '../store'
import { reorderSchedule } from '../store/reducers/attractions'
import { Attraction } from '../types'

export const optimizeSchedule = async (schedule: Attraction[], dispath: StoreDispath): Promise<void> => {
  const order = Array.from(Array(schedule.length).keys()).sort(() => Math.random() - 0.5)
  dispath(reorderSchedule(order))
}
