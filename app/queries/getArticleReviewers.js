import gql from 'graphql-tag'

const GET_ARTICLE_REVIEWERS = gql`
  query GetArticleReviewers($id: ID!) {
    manuscript(id: $id) {
      id
      suggestedReviewer {
        name
        WBId
      }
    }
  }
`

export default GET_ARTICLE_REVIEWERS
