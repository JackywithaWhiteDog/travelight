import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { renderWithProviders } from './utils/test-utils'
import { fireEvent, screen } from '@testing-library/react'
import TaiwanButton from '../components/taiwanButton'
import map from '../assets/map'
import defaultRegions from '../assets/defaultRegions'

const testCases = map.locations.map((location) => ({
  name: location.name,
  id: location.id,
  location: defaultRegions[location.id].location
}))

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}))

let container: any
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

testCases.forEach((testCase) => {
  it('Testing taiwanButton', async () => {
    const store = renderWithProviders(<TaiwanButton />)
    const button = screen.getByRole('none', { name: testCase.name })
    const beforeCount = mockedUsedNavigate.mock.calls.length
    fireEvent.click(button)
    const afterCount = mockedUsedNavigate.mock.calls.length
    expect(afterCount - beforeCount).toBe(1)
    expect(store.getState().attractions.location).toBe(testCase.location)
  })
})
