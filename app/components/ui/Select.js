/* eslint-disable react/prop-types */
import Select from 'react-select'
import React from 'react'

import { withTheme } from 'styled-components'

const StyledSelect = props => {
  const { theme, ...rest } = props

  const stylesFromTheme = {
    container: base => ({
      ...base,
      minWidth: '200px',
    }),
    control: (base, state) => {
      const myBase = {
        backgroundColor: theme.colorBackground,
        border: 0,
        borderBottom: `${theme.borderWidth} ${theme.borderStyle} ${
          theme.colorBorder
        }`,
        borderRadius: 0,
        color: theme.colorText,
        display: 'flex',
        flex: '0 1 auto',
        fontFamily: theme.fontInterface,
        fontSize: theme.fontSizeBase,
        lineHeight: theme.lineHeightBase,
      }
      if (state.isFocused) {
        return {
          ...myBase,
          borderBottom: `${theme.borderWidth} ${theme.borderStyle} ${
            theme.colorPrimary
          }`,
        }
      }
      return myBase
    },
    dropdownIndicator: base => ({
      ...base,
      padding: 6,
    }),
    indicatorSeparator: base => ({
      ...base,
      display: 'none',
    }),
    input: base => ({
      ...base,
      margin: 0,
    }),
    menu: base => ({
      ...base,
      border: `${theme.borderWidth} ${theme.borderStyle} ${theme.colorBorder}`,
      borderRadius: 0,
      boxShadow: 'none',
      flex: '0 1 100%',
      marginTop: theme.gridUnit / 4,
    }),
    menuList: base => ({
      ...base,
    }),
    option: (base, state) => {
      const myBase = {
        ...base,
        backgroundColor: theme.colorBackground,
        color: theme.colorText,
        fontFamily: theme.fontInterface,
        fontSize: theme.fontSizeBase,
        lineHeight: theme.lineHeightBase,
      }
      if (state.isSelected) {
        return {
          ...myBase,
          backgroundColor: theme.colorPrimary,
          color: theme.colorTextReverse,
        }
      }
      if (state.isFocused) {
        return {
          ...myBase,
          backgroundColor: theme.colorBackgroundHue,
          color: theme.colorText,
        }
      }
      return myBase
    },
    valueContainer: base => ({
      ...base,
      padding: 0,
    }),
  }

  return <Select {...rest} styles={stylesFromTheme} />
}

export default withTheme(StyledSelect)
