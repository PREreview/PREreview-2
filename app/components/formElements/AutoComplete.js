import React from 'react'
import styled from 'styled-components'
import Autosuggest from 'react-autosuggest'
import PropTypes from 'prop-types'

import { th } from '@pubsweet/ui-toolkit'

import TextField from './TextField'

const Wrapper = styled.div`
  div[role='combobox'] {
    position: relative;

    div.react-autosuggest__input--open {
      margin-bottom: 0;
    }

    div[role='listbox'] {
      background-color: ${th('colorBackground')};
      position: absolute;
      /* transition: all 0.2s ease-in; */
      width: 400px;

      &.react-autosuggest__suggestions-container--open {
        border: 1px dashed ${th('colorBorder')};
        border-top: 0;
        border-radius: 0 5px 0 5px;
      }

      ul {
        list-style-type: none;
        margin: ${th('gridUnit')} 0;
        padding: 0;

        li {
          padding: ${th('gridUnit')};

          &.react-autosuggest__suggestion--highlighted {
            background-color: ${th('colorBackgroundHue')};
          }
        }
      }
    }
  }
`

const defaultGetSuggestionValue = suggestion => suggestion.value
const defaultRenderSuggestion = suggestion => <span>{suggestion.label}</span>
const defaultRenderInputComponent = props => <TextField {...props} />

class AutoComplete extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      suggestions: [],
      typingTimeout: null,
      value: props.value,
    }
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue,
    })
  }

  onSuggestionsFetchRequested = async ({ value }) => {
    const { delayAfterTypingStopped, fetchData } = this.props
    const { typingTimeout } = this.state

    if (!fetchData) return
    if (typingTimeout) clearTimeout(typingTimeout)

    this.setState({
      typingTimeout: setTimeout(async () => {
        await fetchData(value)
          .then(response => response.json())
          .then(data => {
            this.setState({
              suggestions: data.values,
            })
          })
      }, delayAfterTypingStopped),
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  render() {
    const {
      getSuggestionValue,
      placeholder,
      renderInputComponent,
      renderSuggestion,
      ...rest
    } = this.props
    const { value, suggestions } = this.state

    const inputProps = {
      onChange: this.props.onChange || this.onChange,
      placeholder,
      value,
    }

    return (
      <Wrapper>
        <Autosuggest
          getSuggestionValue={getSuggestionValue}
          inputProps={inputProps}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          renderInputComponent={renderInputComponent}
          renderSuggestion={renderSuggestion}
          suggestions={suggestions}
          {...rest}
        />
      </Wrapper>
    )
  }
}

AutoComplete.propTypes = {
  delayAfterTypingStopped: PropTypes.number,
  getSuggestionValue: PropTypes.func,
  /* eslint-disable-next-line react/require-default-props */
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  renderInputComponent: PropTypes.func,
  renderSuggestion: PropTypes.func,
  value: PropTypes.string,
}

AutoComplete.defaultProps = {
  delayAfterTypingStopped: 500,
  getSuggestionValue: defaultGetSuggestionValue,
  placeholder: 'type something',
  renderInputComponent: defaultRenderInputComponent,
  renderSuggestion: defaultRenderSuggestion,
  value: '',
}

export default AutoComplete
