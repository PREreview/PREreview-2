import gql from 'graphql-tag'

const SUBMIT_MANUSCRIPT = gql`
  mutation submitManuscript($data: ManuscriptInput!) {
    updateManuscript(data: $data) {
      acknowledgements
      authors {
        affiliations
        credit
        email
        name
        submittingAuthor
        WBId
      }
      comments
      communicationHistory {
        content
        timestamp
        user {
          id
          username
        }
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
      imageCaption
      laboratory {
        name
        WBId
      }
      methods
      patternDescription
      reagents
      references
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

export default SUBMIT_MANUSCRIPT
