import styled from 'styled-components'
import { fadeIn, th } from '@pubsweet/ui-toolkit'

const Page = styled.div`
  flex: 1;
  font-family: ${th('fontInterface')};
  padding: ${th('gridUnit')} 15px;
  overflow-y: auto;

  > div {
    animation: ${fadeIn} 0.5s;
  }
`

export default Page
