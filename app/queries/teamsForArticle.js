import gql from 'graphql-tag'

const GET_TEAMS_FOR_ARTICLE = gql`
  query GetTeamsForArticle($id: ID!) {
    teamsForArticle(id: $id) {
      id
      members {
        id
        username
      }
      name
      teamType
    }
  }
`

export default GET_TEAMS_FOR_ARTICLE
