import styled from 'styled-components'

import { Accordion as UIAccordion } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

const Accordion = styled(UIAccordion)`
  border-bottom: ${th('borderWidth')} ${th('borderStyle')} ${th('colorPrimary')};
  margin-bottom: ${th('gridUnit')};

  > span {
    font-variant-ligatures: none;
    font-weight: bold;
  }
`

export default Accordion
