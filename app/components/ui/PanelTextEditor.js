import styled, { css } from 'styled-components'

import { th } from '@pubsweet/ui-toolkit'

import { TextEditor } from '../formElements'

const readOnly = css`
  > div > div {
    margin-bottom: 0;
  }

  label {
    color: ${th('colorPrimary')};
  }

  div[contenteditable] {
    background: ${th('colorBackground')};
    border: 0;
    border-bottom: ${th('borderWidth')} ${th('borderStyle')}
      ${th('colorBorder')};
    cursor: default;
    padding: 0;
    text-align: justify;
  }
`

const StyledEditor = styled(TextEditor)`
  padding: ${th('gridUnit')} 0;
  width: 100%;

  div[contenteditable] {
    margin-bottom: 0;
    padding: ${th('gridUnit')};
  }

  /* stylelint-disable-next-line order/order, order/properties-alphabetical-order */
  ${props => props.readOnly && readOnly};
`

export default StyledEditor
