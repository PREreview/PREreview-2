import styled from 'styled-components'
import { th } from '@pubsweet/ui'

const Page = styled.div`
  flex-grow: 1;
  font-family: ${th('fontInterface')};
  padding: ${th('gridUnit')} 15px;
  overflow-y: auto;
`

export default Page
