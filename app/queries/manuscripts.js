import gql from 'graphql-tag'

const GET_MANUSCRIPT = gql`
  query manuscript($id: ID!) {
    manuscript(id: $id) {
      acknowledgements
      authors {
        credit
        email
        name
        submittingAuthor
        WBId
      }
      comments
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
        decision {
          accepted
          rejected
          revise
        }
        scienceOfficer {
          approved
          pending
        }
        submission {
          initial
          datatypeSelected
          full
        }
      }
      suggestedReviewer {
        name
        WBId
      }
      title
    }
  }
`

const GET_MANUSCRIPT_FOR_EDITOR = gql`
  query manuscript($id: ID!) {
    manuscript(id: $id) {
      communicationHistory {
        content
        # id
        timestamp
        user {
          id
          username
        }
      }
      decisionLetter
      id
      status {
        decision {
          accepted
          rejected
          revise
        }
        scienceOfficer {
          approved
          pending
        }
        submission {
          initial
          datatypeSelected
          full
        }
      }
    }
  }
`

const GET_MANUSCRIPTS = gql`
  query manuscripts {
    manuscripts {
      id
      status {
        decision {
          accepted
          rejected
          revise
        }
        scienceOfficer {
          approved
          pending
        }
        submission {
          initial
          datatypeSelected
          full
        }
      }
      title
    }
  }
`

export { GET_MANUSCRIPT, GET_MANUSCRIPT_FOR_EDITOR, GET_MANUSCRIPTS }
