import styled from 'styled-components'

import { Accordion as UIAccordion } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

const Accordion = styled(UIAccordion)`
  border-bottom: ${th('borderWidth')} ${th('borderStyle')} ${th('colorPrimary')};
  height: calc(${th('gridUnit')} * 3);
  margin: ${th('gridUnit')} 0;

  &:hover {
    border-bottom: calc(${th('borderWidth')} * 2) ${th('borderStyle')}
      ${th('colorPrimary')};
  }

  > span {
    font-variant-ligatures: none;
    font-weight: bold;
  }
`

export default Accordion
