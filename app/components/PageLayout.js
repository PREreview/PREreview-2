import styled, { injectGlobal } from 'styled-components'

// HACK -- figure out why this is needed
injectGlobal`
  html {
    height: 100%;
  }

  body {
    height: 100%;
    overflow: hidden;
  }
`

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export default PageLayout
