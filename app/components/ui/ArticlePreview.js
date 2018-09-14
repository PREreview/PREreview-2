/* eslint-disable react/prop-types */
import React from 'react'
import styled, { css } from 'styled-components'

import { H2, H4, H6 } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'
import { TextEditor } from 'xpub-edit'

import { unCamelCase } from '../../helpers/generic'

const humanize = authors =>
  authors.map((author, i) => {
    if (i === authors.length - 1) return `${author.name}`
    if (i === authors.length - 2) return `${author.name} and `
    return `${author.name}, `
  })

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

const InlineData = ({ label, value }) => (
  <div>
    <strong>{`${label}: `}</strong>
    {value}
  </div>
)

const ArticlePreview = props => {
  const { article } = props
  const {
    authors,
    acknowledgements,
    comments,
    dataType,
    funding,
    image,
    laboratory,
    patternDescription,
    suggestedReviewer,
    title,
  } = article
  const authorNames = humanize(authors)
  const lab = laboratory.name
  const imageSource = `/uploads/${image.url}`

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

        {/* {image.caption ? (
          <figcaption>{article.image.caption}</figcaption>
        ) : null} */}
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
      </Metadata>
    </Wrapper>
  )
}

export default ArticlePreview
