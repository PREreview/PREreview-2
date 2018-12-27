/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'
import { get, omit } from 'lodash'

import { Icon as UIIcon } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import { getWBPerson } from '../../fetch/WBApi'
import { onAutocompleteChange, onSuggestionSelected } from './helpers'
import { Credit } from './index'
import AutoComplete from './AutoComplete'
import TextField from './TextField'

const Wrapper = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: calc(${th('gridUnit')} * 2);
`

const StyledAutoComplete = styled(AutoComplete)`
  margin-bottom: 0;
  margin-right: calc(${th('gridUnit')} * 3);
`

const Label = styled.label`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  padding: 0;
`

const Error = styled.span`
  color: ${th('colorError')};
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  padding-left: ${th('gridUnit')};
`

const Icon = styled(UIIcon)`
  svg {
    stroke: ${th('colorFurniture')};
  }
`

const AffiliationsWrapper = styled.div`
  display: flex;
  justify-content: left;
`

const QuestionMark = () => (
  <a
    href="https://casrai.org/credit/"
    rel="noopener noreferrer"
    target="_blank"
  >
    <Icon>help_circle</Icon>
  </a>
)

const AuthorInput = props => {
  const {
    errors,
    handleChange,
    label,
    name,
    placeholder,
    readOnly,
    required,
    setFieldTouched,
    setFieldValue,
    touched,
    values,
  } = props

  const authorName = `${name}.name`
  const creditName = `${name}.credit`
  const affiliationsName = `${name}.affiliations`

  const err = get(errors, authorName) || get(errors, creditName)
  const touchedThis = get(touched, name)

  const autoCompleteProps = omit(props, ['label', 'name', 'value'])

  const setTouched = () => setFieldTouched(name, true)

  return (
    <div>
      {label && (
        <Label>
          {label} {required && ' *'}{' '}
          {touchedThis && err && <Error>{err}</Error>}
        </Label>
      )}

      <Wrapper>
        <StyledAutoComplete
          error={get(errors, authorName)}
          fetchData={getWBPerson}
          hideErrorMessage
          name={authorName}
          onChange={e =>
            onAutocompleteChange(e, authorName, setFieldValue, handleChange)
          }
          onSuggestionSelected={onSuggestionSelected}
          placeholder={placeholder}
          required
          value={get(values, authorName)}
          {...autoCompleteProps}
        />

        <Credit
          name={creditName}
          readOnly={readOnly}
          setFieldValue={setFieldValue}
          setTouched={setTouched}
          touched={touchedThis}
          values={get(values, creditName)}
        />

        <QuestionMark />
      </Wrapper>

      <AffiliationsWrapper>
        <TextField
          inline
          label="Affiliations"
          name={affiliationsName}
          value={get(values, affiliationsName)}
          {...autoCompleteProps}
          placeholder="The author's affiliations" // override placeholder
        />
      </AffiliationsWrapper>
    </div>
  )
}

export default AuthorInput
