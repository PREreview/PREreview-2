// import React from 'react'
import styled, { injectGlobal } from 'styled-components'

// HACK -- figure out why this is needed
injectGlobal`
  body {
    overflow: hidden;
  }
`

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export default PageLayout
