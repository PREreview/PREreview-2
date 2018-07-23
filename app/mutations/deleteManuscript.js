import gql from 'graphql-tag'

const DELETE_MANUSCRIPT = gql`
  mutation DeleteManuscript($id: ID!) {
    deleteManuscript(id: $id)
  }
`

export default DELETE_MANUSCRIPT
