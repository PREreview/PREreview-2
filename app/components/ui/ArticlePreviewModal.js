import React from 'react'

import ArticlePreview from './ArticlePreview'
import Modal from './Modal'

import { formValuesToData } from '../formElements/helpers'

const ArticlePreviewModal = props => {
  const { values, ...rest } = props

  return (
    <Modal headerText="Article Preview" {...rest}>
      <ArticlePreview article={formValuesToData(values)} livePreview />
    </Modal>
  )
}

export default ArticlePreviewModal
