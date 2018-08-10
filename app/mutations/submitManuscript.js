import gql from 'graphql-tag'

const SUBMIT_MANUSCRIPT = gql`
  mutation submitManuscript($data: ManuscriptInput!) {
    updateManuscript(data: $data) {
      acknowledgements
      authors {
        email
        name
        submittingAuthor
        WBId
      }
      comments
      dataType
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
              id
              value
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
              id
              value
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
              id
              value
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
              id
              value
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
        initialSubmission
        submitted
      }
      suggestedReviewer
      title
    }
  }
`

export default SUBMIT_MANUSCRIPT
