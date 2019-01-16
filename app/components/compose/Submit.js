/* eslint-disable react/prop-types */

import React from 'react'
import { adopt } from 'react-adopt'
import { withRouter } from 'react-router-dom'

import { getArticle, updateArticle, uploadFile } from './pieces'

const mapper = {
  getArticle: props => getArticle(props),
  updateArticle,
  uploadFile,
}

const mapProps = args => ({
  article: args.getArticle.data && args.getArticle.data.manuscript,
  loading: args.getArticle.loading,
  update: args.updateArticle.updateArticle,
  upload: args.uploadFile.uploadFile,
})

const Composed = adopt(mapper, mapProps)

const ComposedSubmit = props => {
  const { match, render, ...otherProps } = props
  const { id: articleId } = match.params

  return (
    <Composed articleId={articleId} {...otherProps}>
      {mappedProps => render({ articleId, ...mappedProps })}
    </Composed>
  )
}

export default withRouter(ComposedSubmit)
