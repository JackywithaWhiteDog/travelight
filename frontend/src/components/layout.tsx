import React from 'react'
import { createGlobalStyle } from 'styled-components'
import Header from './header'

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`

interface LayoutProps {
  children: React.ReactElement
}

const Layout = (props: LayoutProps): React.ReactElement => (
  <>
    <GlobalStyles />
    <Header />
    <main>{props.children}</main>
  </>
)

export default Layout
