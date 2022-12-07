import React from 'react'
import { Box, Typography } from '@mui/material'
import TaiwanButton from '../components/taiwanButton'
import title from '../assets/title.svg'

const Home = (): React.ReactElement => {
  return (
    <>
      <Box sx={{
        display: 'grid',
        gridTemplateRows: 'auto',
        gridTemplateColumns: '35% auto',
        height: 'calc(100vh - 64px)',
        backgroundColor: 'primary.light',
        paddingLeft: '25px',
        paddingRight: '25px'
      }}>
        <Box sx={{
          height: '100%',
          display: 'flex',
          flexFlow: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center'
        }}>
          <img src={title} height={45} />
          <Typography variant='h6' sx={{
            color: 'dimgray',
            fontSize: '.86em',
            letterSpacing: '-0.05em',
            wordSpacing: '0.2em',
            fontFamily: '"Sono","Roboto","Helvetica","Arial",sans-serif',
            marginBottom: '20px'
          }}>
            Light Up the Way for Travel, Make Your Travel Light
          </Typography>
          <Typography paragraph sx={{ fontSize: '.8em', textAlign: 'justify' }}>
            Before traveling, there are a bunch of things to consider.
            For instance, we need to decide which attractions to visit and how to visit them one by one, so that we can spend less time on transportation while also matching the attractions&apos; opening hours.
          </Typography>
          <Typography paragraph sx={{ fontSize: '.8em', textAlign: 'justify', marginBottom: 0 }}>
            Coming up with a plan to satisfy the above requirements is often tedious and time-consuming.
            But no worries, here comes your savior -
          </Typography>
          <Typography paragraph sx={{ fontSize: '.8em', textAlign: 'justify', fontWeight: 800 }}>
            Travelight: your best travelling assistant!
          </Typography>
          <Typography paragraph sx={{ fontSize: '.8em', textAlign: 'justify' }}>
            The system not only recommends high-rating attractions, but also optimize your traveling schedule to meet your personal interest as well as external constraints.
            With Travelight, everyone can plan their travelling way more easier!
          </Typography>
        </Box>
        <TaiwanButton />
      </Box>
    </>
  )
}

export default Home
