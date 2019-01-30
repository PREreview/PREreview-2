/* eslint-disable react/prop-types */

import React, { Fragment } from 'react'
import styled from 'styled-components'
import { get, keys, isUndefined } from 'lodash'
import { State } from 'react-powerplug'

import { Action, Button } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import { Accordion } from './index'
import { TextField } from '../formElements'
import { MetadataForm } from '../form'

const StyledAction = styled(Action)`
  line-height: unset;
`

const ContentWrapper = styled.div`
  margin: calc(${th('gridUnit')} * 2) calc(${th('gridUnit')} * 3);
`

const Error = styled.div`
  color: ${th('colorError')};
  font-size: ${th('fontSizeBaseSmall')};
  font-variant-ligatures: none;
  line-height: ${th('lineHeightBaseSmall')};
  margin-bottom: calc(${th('gridUnit')} * 2);
`

const MetadataWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const MetadataName = styled.span`
  font-style: italic;
  font-weight: bold;
  margin-right: ${th('gridUnit')};
`

const Metadata = props => {
  const { data, openFields } = props
  const names = keys(data)
  const upperCaseList = ['doi']

  return (
    <MetadataWrapper>
      <div>
        {names.map(name => {
          let formattedName
          if (upperCaseList.includes(name)) formattedName = name.toUpperCase()

          return (
            <div key={name}>
              <MetadataName>{formattedName || name}:</MetadataName>
              {data[name]}
            </div>
          )
        })}
      </div>

      <div>
        <StyledAction onClick={openFields}>Edit</StyledAction>
      </div>
    </MetadataWrapper>
  )
}

const EditorPanelMetadata = props => {
  const { articleId, doi, updateMetadata } = props

  return (
    <Accordion expanded label="Metadata">
      <ContentWrapper>
        <State initial={{ showForm: isUndefined(doi) }}>
          {({ state, setState }) => {
            if (!state.showForm)
              return (
                <Metadata
                  data={{ doi }}
                  openFields={() => setState({ showForm: true })}
                />
              )

            return (
              <MetadataForm
                articleId={articleId}
                doi={doi}
                setState={setState}
                updateMetadata={updateMetadata}
              >
                {formProps => {
                  const { errors, values, ...rest } = formProps

                  return (
                    <Fragment>
                      <TextField
                        label="DOI"
                        name="doi"
                        placeholder="Enter article DOI"
                        value={get(values, 'doi')}
                        {...rest}
                      />

                      <Error>{get(errors, 'doi')}</Error>

                      <Button primary type="submit">
                        Save
                      </Button>
                    </Fragment>
                  )
                }}
              </MetadataForm>
            )
          }}
        </State>
      </ContentWrapper>
    </Accordion>
  )
}

export default EditorPanelMetadata
