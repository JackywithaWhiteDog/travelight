import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'

const theme = createTheme({
  palette: {
    primary: {
      light: '#def5e5',
      main: '#bcead5',
      dark: '#8ec3b0'
    }
  }
})

interface LayoutProps {
  showSettings: boolean
}

const Layout = (props: LayoutProps): React.ReactElement => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Header showSettings={props.showSettings} />
    <main><Outlet /></main>
  </ThemeProvider>
)

export default Layout
