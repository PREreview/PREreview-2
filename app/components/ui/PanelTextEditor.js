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
    /* margin-bottom: 0; */
    padding: 0;
  }
`

const StyledEditor = styled(TextEditor)`
  padding: ${th('gridUnit')} 0;
  width: 100%;

  div[contenteditable] {
    margin-bottom: 0;
  }

  ${props => props.readOnly && readOnly};
`

export default StyledEditor
