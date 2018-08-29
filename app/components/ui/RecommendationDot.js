import styled from 'styled-components'

import { th } from '@pubsweet/ui-toolkit'

const background = props => {
  const { recommendation } = props
  if (recommendation === 'revise') return th('colorWarning')
  if (recommendation === 'accept') return th('colorSuccess')
  if (recommendation === 'reject') return th('colorError')
  return th('colorFurniture')
}

const RecommendationDot = styled.div`
  align-self: center;
  background: ${background};
  border-radius: 50%;
  display: inline-flex;
  height: calc(${th('gridUnit')} * 1);
  margin-right: ${th('gridUnit')};
  width: calc(${th('gridUnit')} * 1);
`

export default RecommendationDot
