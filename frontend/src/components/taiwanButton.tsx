import { Container } from '@mui/material'
import React from 'react'
import { CheckboxSVGMap } from 'react-svg-map'
import 'react-svg-map/lib/index.css'
import Taiwan from '../assets/map'

const TaiwanButton = (): React.ReactElement => (
  <Container sx={{ width: '500px' }}>
    <CheckboxSVGMap
      map={Taiwan}
    />
  </Container>
)

export default TaiwanButton
