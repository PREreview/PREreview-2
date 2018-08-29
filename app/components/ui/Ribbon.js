/* eslint-disable react/prop-types */

import React from 'react'
import styled, { css } from 'styled-components'

import { th } from '@pubsweet/ui-toolkit'

const background = props => {
  if (props.status === 'success') return th('colorSuccess')
  if (props.status === 'error') return th('colorError')
  return th('colorBackgroundHue')
}

const color = props => {
  const { status } = props
  return status === 'success' || status === 'error'
    ? th('colorTextReverse')
    : th('colorText')
}

const hidden = css`
  height: calc(${th('lineHeightBaseSmall')} + ${th('gridUnit')});
  visibility: hidden;
`

const StyledRibbon = styled.div`
  background: ${background};
  color: ${color};
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  padding: calc(${th('gridUnit')} / 2);
  text-align: center;
  visibility: visible;

  ${props => props.hide && hidden};
`

const Ribbon = props => {
  const { message, status } = props
  const hide = !message || !message.length > 0

  return (
    <StyledRibbon hide={hide} status={status}>
      {message}
    </StyledRibbon>
  )
}

export default Ribbon
