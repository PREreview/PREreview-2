import gql from 'graphql-tag'

const GET_MANUSCRIPT = gql`
  query manuscript($id: ID!) {
    manuscript(id: $id) {
      acknowledgements
      authors {
        email
        name
        submittingAuthor
        WBId
      }
      comments
      communicationsHistory {
        content
        timestamp
        userId
        username
      }
      dataType
      decisionLetter
      disclaimer
      funding
      geneExpression {
        antibodyUsed
        backboneVector {
          name
          WBId
        }
        coinjected
        constructComments
        constructionDetails
        detectionMethod
        dnaSequence {
          name
          WBId
        }
        expressionPattern {
          name
          WBId
        }
        fusionType {
          name
          WBId
        }
        genotype
        injectionConcentration
        inSituDetails
        integratedBy {
          name
          WBId
        }
        observeExpression {
          certainly {
            certainly {
              name
              WBId
            }
            during {
              name
              WBId
            }
            id
            subcellularLocalization {
              name
              WBId
            }
          }
          partially {
            partially {
              name
              WBId
            }
            during {
              name
              WBId
            }
            id
            subcellularLocalization {
              name
              WBId
            }
          }
          possibly {
            possibly {
              name
              WBId
            }
            during {
              name
              WBId
            }
            id
            subcellularLocalization {
              name
              WBId
            }
          }
          not {
            not {
              name
              WBId
            }
            during {
              name
              WBId
            }
            id
            subcellularLocalization {
              name
              WBId
            }
          }
        }
        reporter {
          name
          WBId
        }
        species {
          name
          WBId
        }
        strain
        transgeneName
        transgeneUsed {
          name
          WBId
        }
        utr {
          name
          WBId
        }
        variation {
          name
          WBId
        }
      }
      id
      image {
        name
        url
      }
      laboratory {
        name
        WBId
      }
      patternDescription
      status {
        dataTypeSelected
        decision {
          accepted
          rejected
          revise
        }
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
