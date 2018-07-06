import styled from 'styled-components'
import { fadeIn, th } from '@pubsweet/ui-toolkit'

const Page = styled.div`
  flex: 1;
  font-family: ${th('fontInterface')};
  /* margin-bottom: calc(${th('gridUnit')} * 20); */
  padding: ${th('gridUnit')} 15px calc(${th('gridUnit')} * 14);
  overflow-y: auto;

  > div {
    animation: ${fadeIn} 0.5s;
  }
`

export default Page
