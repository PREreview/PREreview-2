/* eslint-disable react/prop-types */
import React from 'react'
import styled, { css } from 'styled-components'
import { forIn, isUndefined, keys, pickBy } from 'lodash'

import config from 'config'
import { H2, H4, H6 } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'
import { TextEditor } from 'xpub-edit'

import { unCamelCase } from '../../helpers/generic'

const makeAuthorDisplayValues = authors =>
  authors.map((author, i) => {
    if (i === authors.length - 1) return `${author.name}`
    if (i === authors.length - 2) return `${author.name} and `
    return `${author.name}, `
  })

const makeMetadataDisplayValues = geneExpression => {
  const { detectionMethod } = geneExpression
  const { detectionMethodCorrelations } = config
  const correlations = detectionMethodCorrelations[detectionMethod]

  if (isUndefined(correlations)) return []

  const makeDisplayValue = value =>
    value.name || (isUndefined(value.name) && value) || '-'

  const extracted = correlations.map((item, i) => {
    const key = correlations[i]
    const value = geneExpression[key]
    const label = unCamelCase(key)

    const displayValue = Array.isArray(value)
      ? value.map(
          (v, pos) =>
            `${makeDisplayValue(v)}${pos === v.length - 1 ? ' ,' : ''}`,
        )
      : makeDisplayValue(value)

    return { displayValue, label }
  })

  return extracted
}

const Wrapper = styled.div`
  font-family: ${th('fontReading')};
  margin: 0 auto;
  max-width: 1024px;
  padding: 0 calc(${th('gridUnit')} * 7) 0 calc(${th('gridUnit')} * 6);
`

const headingStyle = css`
  color: ${th('colorText')};
`

const PageHeader = styled(H2)`
  ${headingStyle};
`

const Title = styled(H4)`
  font-family: ${th('fontReading')};
  margin: 0;
  text-transform: capitalize;
  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${headingStyle};
`

const SectionHeader = styled(H6)`
  margin: 0;
  ${headingStyle};
`

const MetadataHeader = styled(H4)`
  color: ${th('colorText')};
  margin: 0;
  padding: ${th('gridUnit')} 0;
`

const Section = styled.section`
  margin-bottom: ${th('gridUnit')};
  text-align: justify;
`

const Lab = styled.div`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
`

const Image = styled.img`
  height: auto;
  width: 100%;
`

const Metadata = styled.div`
  background: ${th('colorBackgroundHue')};
  font-family: ${th('fontInterface')};
  padding: ${th('gridUnit')};
`

const Editor = styled(TextEditor)`
  border: 0;
  font-family: ${th('fontReading')};
  font-size: ${th('fontSizeBase')};
  line-height: ${th('lineHeightBase')};
  margin: 0;
  padding: 0;
`

const MetadataEditor = styled(Editor)`
  font-family: ${th('fontInterface')};
`

const ObserveExpressionSection = styled.div`
  border-top: 2px ${th('borderStyle')} ${th('colorBorder')};
  padding-top: ${th('gridUnit')};
`

const ObserveExpressionGroup = styled.div`
  border-bottom: ${th('borderWidth')} dashed ${th('colorBorder')};
  margin-bottom: ${th('gridUnit')};
`

const InlineData = ({ label, value }) => (
  <div>
    <strong>{`${label}: `}</strong>
    {value}
  </div>
)

const ObserveExpression = ({ data }) => {
  const rows = []
  const keysOfInterest = [
    'certainly',
    'partially',
    'possibly',
    'not',
    'during',
    'subcellularLocalization',
  ]

  forIn(data, (v, k) => {
    if (!Array.isArray(v)) return

    /* eslint-disable array-callback-return */
    v.map(item => {
      const picked = pickBy(item, (value, key) => keysOfInterest.includes(key))
      const row = keys(picked).map(key => [key, picked[key].name || '-'])
      rows.push(row)
    })
  })

  const Group = ({ row }) => (
    <ObserveExpressionGroup>
      {row.map(element => (
        <div>
          {element[0]}: {element[1]}
        </div>
      ))}
    </ObserveExpressionGroup>
  )

  return (
    <ObserveExpressionSection>
      <div>
        <strong>Observe Expression</strong>
      </div>

      {rows.map(r => (
        <Group row={r} />
      ))}
    </ObserveExpressionSection>
  )
}

const ArticlePreview = props => {
  const { article } = props
  const {
    authors,
    acknowledgements,
    comments,
    dataType,
    funding,
    geneExpression,
    image,
    laboratory,
    patternDescription,
    suggestedReviewer,
    title,
  } = article

  const {
    detectionMethod,
    expressionPattern,
    observeExpression,
    species,
  } = geneExpression

  const authorNames = makeAuthorDisplayValues(authors)
  const lab = laboratory.name
  const imageSource = `/uploads/${image.url}`
  const metadata = makeMetadataDisplayValues(geneExpression)

  return (
    <Wrapper>
      <PageHeader>Article Preview</PageHeader>

      <Section>
        <Title>{title}</Title>
        <div>{authorNames}</div>
        <Lab>{lab}</Lab>
      </Section>

      <Section>
        <Image alt={image.name} src={imageSource} />
      </Section>

      <Section>
        <SectionHeader>Description:</SectionHeader>
        <Editor readonly value={patternDescription} />
      </Section>

      <Section>
        <SectionHeader>Acknowledgments</SectionHeader>
        {acknowledgements}
      </Section>

      <Section>
        <SectionHeader>Funding</SectionHeader>
        {funding}
      </Section>

      <Metadata>
        <MetadataHeader>Metadata</MetadataHeader>

        <Section>
          <SectionHeader>Author Comments</SectionHeader>
          <MetadataEditor readonly value={comments} />
        </Section>

        <Section>
          <InlineData
            label="Suggested Reviewer"
            value={suggestedReviewer.name}
          />
        </Section>

        <Section>
          <InlineData label="Datatype" value={unCamelCase(dataType)} />
        </Section>

        <Section>
          <InlineData label="Species" value={species.name} />
          <InlineData
            label="Expression Pattern for Gene"
            value={expressionPattern.name}
          />
        </Section>

        <Section>
          <InlineData
            label="Detection Method"
            value={unCamelCase(detectionMethod)}
          />

          {metadata.map(item => (
            <InlineData
              key={item.label}
              label={item.label}
              value={item.displayValue}
            />
          ))}
        </Section>

        <ObserveExpression data={observeExpression} />
      </Metadata>
    </Wrapper>
  )
}

export default ArticlePreview
