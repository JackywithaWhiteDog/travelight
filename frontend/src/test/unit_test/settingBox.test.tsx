import React, { ReactElement, useState } from 'react'
import SettingBox from '../../components/settingBox'
import { StoreState } from '../../store'
import { renderWithProviders } from '../utils/test-utils'
import { fireEvent, screen } from '@testing-library/react'
import { useSelector } from 'react-redux'

const TestSettingBox = (): ReactElement => {
  const [checkedIndices, setCheckedIndices] = useState<number[]>([5, 5, (new Date()).getDay(), 2])
  const prevCheckedIndices = useSelector((state: StoreState) => state.attractions.checkedSettingIndices)
  const closeSettingBox = (): void => {
    // Reset settings if closing setting box without saving changes
    setCheckedIndices([...prevCheckedIndices])
  }
  return (
    <SettingBox setCheckedIndices={setCheckedIndices} closeSettingBox={closeSettingBox} checkedIndices={checkedIndices}/>
  )
}

it('Testing settingBox', async () => {
  const ratingNames = ['4.7+ 1 Star', '4.5+ 1 Star', '4.0+ 1 Star', '3.5+ 1 Star', '3.0+ 1 Star', '不限']
  const ratingExpect = [4.7, 4.5, 4.0, 3.5, 3.0, 0]
  const commentsNames = ['10,000+', '5,000+', '2,500+', '1,500+', '500+', '不限']
  const commentsExpect = [10_000, 5_000, 2_500, 1_500, 500, 0]
  const departureDayNames = ['週日', '週一', '週二', '週三', '週四', '週五', '週六']
  const departureExpect = [0, 1, 2, 3, 4, 5, 6]
  const transportationNames = ['汽車', '機車', '大眾運輸', '步行']
  const transportationExpect = ['driving', 'bicycling', 'transit', 'walking']

  const store = renderWithProviders(<TestSettingBox/>)
  const savebutton = screen.getByRole('button', { name: '保存' })
  expect(savebutton).not.toBeNull()
  for (let i = 0; i < ratingNames.length; i++) {
    const checkBox = (ratingNames[i] === '不限')
      ? screen.getAllByRole('checkbox', { name: ratingNames[i] })[0]
      : screen.getByRole('checkbox', { name: ratingNames[i] })
    expect(checkBox).not.toBeNull()
    if (savebutton !== null && checkBox !== undefined) {
      fireEvent.click(checkBox)
      fireEvent.click(savebutton)
      expect(store.getState().attractions.setting.minRating).toBe(ratingExpect[i])
    }
  }
  for (let i = 0; i < commentsNames.length; i++) {
    const checkBox = (commentsNames[i] === '不限')
      ? screen.getAllByRole('checkbox', { name: commentsNames[i] })[1]
      : screen.getByRole('checkbox', { name: commentsNames[i] })
    expect(checkBox).not.toBeNull()
    if (savebutton !== null && checkBox !== undefined) {
      fireEvent.click(checkBox)
      fireEvent.click(savebutton)
      expect(store.getState().attractions.setting.minComments).toBe(commentsExpect[i])
    }
  }
  for (let i = 0; i < departureDayNames.length; i++) {
    const checkBox = screen.getByRole('checkbox', { name: departureDayNames[i] })
    expect(checkBox).not.toBeNull()
    if (savebutton !== null && checkBox !== undefined) {
      fireEvent.click(checkBox)
      fireEvent.click(savebutton)
      expect(store.getState().attractions.setting.departureDay).toBe(departureExpect[i])
    }
  }
  for (let i = 0; i < transportationNames.length; i++) {
    const checkBox = screen.getByRole('checkbox', { name: transportationNames[i] })
    expect(checkBox).not.toBeNull()
    if (savebutton !== null && checkBox !== undefined) {
      fireEvent.click(checkBox)
      fireEvent.click(savebutton)
      expect(store.getState().attractions.setting.transportation).toBe(transportationExpect[i])
    }
  }
})
