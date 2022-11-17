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
  padding-top: 60px;
  height: calc(100vh - 60px);
`

const Layout = (props: LayoutProps): React.ReactElement => (
  <>
    <GlobalStyles />
    <Header />
    <BaseMain>{props.children}</BaseMain>
  </>
)

export default Layout
