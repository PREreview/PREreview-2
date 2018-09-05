/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'
import { clone } from 'lodash'

import { Accordion, Button, H2, List } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import ComposedAssignReviewers from './compose/AssignReviewers'
import { Select as DefaultSelect } from './ui'
import { AssignReviewersForm } from './form'
import Loading from './Loading'

const Centered = styled.div`
  margin: 0 auto;
  /* max-width: 770px; */
  width: 60%;

  > div {
    margin-bottom: calc(${th('gridUnit')} * 2);
  }
`

const PageHeading = styled(H2)`
  margin: 0 auto calc(${th('gridUnit')} * 3);
  padding: 0 calc(${th('gridUnit')} * 2);
  text-align: center;
`

const ContentWrapper = styled.div`
  display: flex;
  margin-left: ${th('gridUnit')};

  form {
    width: 100%;

    button {
      margin-top: calc(${th('gridUnit')} * 2);
    }
  }
`

const Select = styled(DefaultSelect)`
  max-width: unset !important;
  width: 100%;
`

const Tag = styled.span`
  background-color: ${th('colorBackgroundHue')};
  font-size: ${th('fontSizeBase')};
  line-height: ${th('lineHeightBase')};
  padding: calc(${th('gridUnit')} / 2);
  margin: ${th('gridUnit')} 0;
`

const SuggestedReviewer = props => {
  const { name } = props
  return <Tag>{name}</Tag>
}

const SuggestedReviewers = props => {
  const { data } = props
  if (!data || data.length === 0) return null
  const items = data.map(item => {
    const i = clone(item)
    i.id = i.WBId
    return i
  })

  return <List component={SuggestedReviewer} items={items} />
}

const Section = ({ children, label }) => (
  <Accordion label={label} startExpanded>
    <ContentWrapper>{children}</ContentWrapper>
  </Accordion>
)

const AssignReviewers = props => {
  const { loading, suggested, users, ...otherProps } = props

  if (loading) return <Loading />

  let suggestedReviewers
  if (suggested && suggested.name && suggested.name.length > 0)
    suggestedReviewers = [suggested]

  const userOptions = users
    ? users.map(user => ({
        label: user.username,
        value: user.id,
      }))
    : []

  return (
    <Centered>
      <PageHeading>Assign Reviewers</PageHeading>

      <Section label="Suggested Reviewer by the Author">
        <SuggestedReviewers data={suggestedReviewers} />
      </Section>

      <Section label="Assign Reviewers to Article">
        <AssignReviewersForm {...otherProps}>
          {formProps => {
            const { dirty, setFieldValue, values } = formProps

            const handleChange = newValue =>
              setFieldValue('reviewers', newValue)

            return (
              <React.Fragment>
                <Select
                  closeMenuOnSelect={false}
                  isMulti
                  name="reviewers"
                  onChange={handleChange}
                  options={userOptions}
                  value={values.reviewers}
                />

                <Button disabled={!dirty} primary type="submit">
                  Save
                </Button>
              </React.Fragment>
            )
          }}
        </AssignReviewersForm>
      </Section>

      <Section label="Status">Something else 3</Section>
    </Centered>
  )
}

const Composed = () => <ComposedAssignReviewers render={AssignReviewers} />
export default Composed
