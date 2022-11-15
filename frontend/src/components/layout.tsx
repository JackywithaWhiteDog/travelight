import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
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

const BaseMain = styled.main`
  margin-top: 60px;
`

const Layout = (props: LayoutProps): React.ReactElement => (
  <>
    <GlobalStyles />
    <Header />
    <BaseMain>{props.children}</BaseMain>
  </>
)

export default Layout
