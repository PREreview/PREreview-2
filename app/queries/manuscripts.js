import gql from 'graphql-tag'

const GET_MANUSCRIPT = gql`
  query manuscript($id: ID!) {
    manuscript(id: $id) {
      acknowledgements
      authors {
        email
        name
        submittingAuthor
        WBPerson
      }
      comments
      dataType
      disclaimer
      funding
      geneExpression {
        antibodyUsed
        backboneVector
        coinjected
        constructComments
        constructionDetails
        detectionMethod
        dnaSequence {
          id
          name
        }
        expressionPattern
        fusionType
        genotype
        injectionConcentration
        inSituDetails
        integratedBy
        observeExpression {
          certainly {
            certainly {
              id
              value
            }
            during {
              id
              value
            }
            id
            subcellularLocalization {
              id
              value
            }
          }
          partially {
            partially {
              id
              value
            }
            during {
              id
              value
            }
            id
            subcellularLocalization {
              id
              value
            }
          }
          possibly {
            possibly {
              id
              value
            }
            during {
              id
              value
            }
            id
            subcellularLocalization {
              id
              value
            }
          }
          not {
            not {
              id
              value
            }
            during {
              id
              value
            }
            id
            subcellularLocalization {
              id
              value
            }
          }
        }
        reporter
        strain
        species
        transgeneName
        transgeneUsed {
          id
          name
        }
        utr
        variation
      }
      id
      image {
        name
        url
      }
      laboratory
      patternDescription
      status {
        dataTypeSelected
        initialSubmission
        submitted
      }
      suggestedReviewer
      title
    }
  }
`

const GET_MANUSCRIPTS = gql`
  query manuscripts {
    manuscripts {
      id
      status {
        dataTypeSelected
        initialSubmission
        submitted
      }
      title
    }
  }
`

export { GET_MANUSCRIPT, GET_MANUSCRIPTS }
