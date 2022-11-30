import React, { useState } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import SettingBox from '../components/settingBox'
import Header from '../components/header'

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

it('renders with or without a name', async () => {
  const setCheckedIndices = jest.fn()
  const closeSettingBox = jest.fn()
  const checkedIndices = [5, 5, (new Date()).getDay(), 2]
  await act(() => {
    render(<SettingBox
      checkedIndices={checkedIndices}
      setCheckedIndices={setCheckedIndices}
      closeSettingBox={closeSettingBox}
    />, container)
  })

  const button = document.querySelector('[title=分數]')
  if (button !== null) {
    expect(button.innerHTML).toBe('Turn on')
  }
  // await act(() => {
  //   button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  // })

  // expect(container.textContent).toBe('Hey, stranger')
})

// it('renders with or without a name', async () => {
//   await act(() => {
//     render(<Header/>, container)
//   })
//   expect(container.textContent).toBe('Hey, stranger')
// })
