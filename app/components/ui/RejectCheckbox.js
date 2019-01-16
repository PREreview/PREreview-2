import React from 'react'
import styled from 'styled-components'

import { th } from '@pubsweet/ui-toolkit'

import Checkbox from '../formElements/Checkbox'

const StyledCheckbox = styled(Checkbox)`
  span {
    color: ${th('colorError')};
    font-size: ${th('fontSizeBase')};
    line-height: ${th('lineHeightBase')};

    &:hover {
      color: ${th('colorError')};
    }

    &:hover:before {
      background: ${th('colorError')};
      box-shadow: 0 0 0 1px ${th('colorError')};
    }

    &::selection {
      background: none;
    }
  }
`

// eslint-disable-next-line arrow-body-style
const RejectCheckbox = props => {
  return <StyledCheckbox text="Reject" {...props} />
}

export default RejectCheckbox
