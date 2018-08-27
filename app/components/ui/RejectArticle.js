/* eslint-disable react/prop-types */

import React from 'react'

import { Button } from '@pubsweet/ui'

import { PanelTextEditor, RejectCheckbox } from './index'

const RejectArticle = props => {
  const { alreadyRejected, checked, update, values } = props
  const isChecked = alreadyRejected || checked

  return (
    <React.Fragment>
      {!alreadyRejected && (
        <RejectCheckbox checked={isChecked} onChange={update} />
      )}

      {isChecked && (
        <React.Fragment>
          <PanelTextEditor
            label="Decision Letter"
            name="decisionLetter"
            placeholder="Write some comments to the author"
            readOnly={alreadyRejected}
            required
            value={values.decisionLetter}
            {...props}
          />

          {!alreadyRejected && (
            <Button primary type="submit">
              Submit
            </Button>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default RejectArticle
