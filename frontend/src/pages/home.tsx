import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { getDefaultRegions } from '../api/regions'
import { StoreState } from '../store'
import { setLocation } from '../store/reducers/attractions'
import TaiwanButton from '../components/taiwanButton'

const Home = (): React.ReactElement => {
  const dispatch = useDispatch()
  const defaultRegions = useSelector((state: StoreState) => state.attractions.defaultRegions, shallowEqual)
  const navigate = useNavigate()

  useEffect(() => {
    void getDefaultRegions(dispatch)
  }, [])

  return (
    <>
      <h1>home</h1>
      {defaultRegions.map((region, i) => (
        <Button
          variant="contained"
          key={i}
          onClick={() => {
            dispatch(setLocation(region.location))
            navigate('map')
          }}
        >
          {region.name}
        </Button>
      ))}
      <TaiwanButton/>
    </>
  )
}

export default Home
