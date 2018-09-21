import styled from 'styled-components'
import { fadeIn, th } from '@pubsweet/ui-toolkit'

const Page = styled.div`
  flex: auto;
  font-family: ${th('fontInterface')};
  height: 100%;
  overflow-y: auto;
  padding: calc(${th('gridUnit')} * 2);

  > div {
    animation: ${fadeIn} 0.5s;
  }
`

export default Page
