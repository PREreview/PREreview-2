import styled from 'styled-components'

import { H6 } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

const PanelSectionHeader = styled(H6)`
  color: ${th('colorText')};
  margin: calc(${th('gridUnit')} * 2) 0 0 0;
`

export default PanelSectionHeader
