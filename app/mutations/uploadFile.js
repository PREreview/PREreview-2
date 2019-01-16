import gql from 'graphql-tag'

const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    upload(file: $file) {
      url
    }
  }
`

export default UPLOAD_FILE
