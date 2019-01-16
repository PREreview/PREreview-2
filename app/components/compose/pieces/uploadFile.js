/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'

import UPLOAD_FILE from '../../../mutations/uploadFile'

const UploadFileMutation = props => {
  const { render } = props

  return (
    <Mutation mutation={UPLOAD_FILE}>
      {(uploadFile, uploadFileResponse) =>
        render({ uploadFile, uploadFileResponse })
      }
    </Mutation>
  )
}

export default UploadFileMutation
