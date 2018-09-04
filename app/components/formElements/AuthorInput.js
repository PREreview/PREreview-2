/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'
import { get, omit } from 'lodash'

import { th } from '@pubsweet/ui-toolkit'

import { getWBPerson } from '../../fetch/WBApi'
import { onAutocompleteChange, onSuggestionSelected } from './helpers'
import { /* AutoComplete, */ Credit } from './index'
import AutoComplete from './AutoComplete'

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

  const err = get(errors, authorName) || get(errors, creditName)
  const touchedThis = get(touched, name)

  const autoCompleteProps = omit(props, ['label', 'name', 'value'])

  const setTouched = () => setFieldTouched(name, true)

  return (
    <React.Fragment>
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
      </Wrapper>
    </React.Fragment>
  )
}

export default AuthorInput
