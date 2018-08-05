import gql from 'graphql-tag'

const SUBMIT_MANUSCRIPT = gql`
  mutation submitManuscript($data: ManuscriptInput!) {
    updateManuscript(data: $data) {
      acknowledgements
      authors {
        email
        name
        submittingAuthor
        wormBaseId
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

export default SUBMIT_MANUSCRIPT
