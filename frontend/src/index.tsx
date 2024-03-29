import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import Layout from './components/layout'
import Home from './pages/home'
import { Provider } from 'react-redux'
import store from './store'
import App from './pages/app'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <Provider store={store} >
    <BrowserRouter>
      <Routes>
        <Route element={<Layout showSettings={false} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<Layout showSettings={true} />}>
          <Route path="/map" element={<App />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
