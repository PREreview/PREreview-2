import Select from 'react-select'
import styled from 'styled-components'

import { lighten, th } from '@pubsweet/ui-toolkit'

const StyledSelect = styled(Select)`
  margin-top: ${th('gridUnit')};
  outline: none;

  > div:first-of-type {
    border-radius: ${th('borderRadius')};
    border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
    box-shadow: none;

    &:hover {
      border-color: ${th('colorPrimary')};
    }

    > div > div > div:last-child {
      &:hover {
        background: ${lighten('colorError', 50)};
        color: ${th('colorError')};
      }
    }
  }
`

export default StyledSelect
