import { createTheme, ThemeProvider } from '@mui/material'
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import Header from './header'

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`

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
  children: React.ReactElement
}

const Layout = (props: LayoutProps): React.ReactElement => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Header />
    <main>{props.children}</main>
  </ThemeProvider>
)

export default Layout
