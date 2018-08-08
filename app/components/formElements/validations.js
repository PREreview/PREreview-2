import * as yup from 'yup'
import { cloneDeep, concat, isString, merge, reduce, values } from 'lodash'

import { validateWBPerson } from '../../fetch/WBApi'

const stripHTML = html => {
  const tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

const validateAuthor = {
  error: 'Must be a registered WormBase Person',
  // eslint-disable-next-line func-names, prefer-arrow-callback
  test: function test(val) {
    if (!val) return true
    const { WBPerson } = this.parent
    if (!WBPerson) return false

    return validateWBPerson({ id: WBPerson, search: val })
      .then(response => response.json())
      .then(res => {
        if (!res.data.result) return false
        return true
      })
  },
}

const initial = {
  author: yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email adress'),
    name: yup
      .string()
      .required('Name is required')
      .test('is author valid', validateAuthor.error, validateAuthor.test),
    WBPerson: yup.string(),
  }),
  coAuthors: yup.array(
    yup.object().shape({
      name: yup
        .string()
        .test('is co-author valid', validateAuthor.error, validateAuthor.test),
    }),
  ),
  comments: yup.string(),
  disclaimer: yup.boolean().test('disclaimer', 'Required', val => val),
  funding: yup.string().required('Funding is required'),
  image: yup.object().shape({
    url: yup.string().required('Image is required'),
  }),
  laboratory: yup.string().required('Laboratory is required'),
  patternDescription: yup
    .string()
    .test(
      'pattern-description-not-empty',
      'Pattern description is required',
      val => stripHTML(val).length > 0,
    ),
  title: yup.string().required('Title is required'),
}

const selectDataType = {
  dataType: yup.string().required('Datatype is required'),
}

const geneExpression = {
  geneExpression: yup.object().shape({
    antibodyUsed: yup.string().when(['detectionMethod'], {
      is: val => val === 'antibody',
      then: yup.string().required('Antibody is required'),
    }),
    backboneVector: yup.string(),
    coinjected: yup.string(),
    constructComments: yup.string(),
    constructionDetails: yup.string().when(['detectionMethod'], {
      is: val => val === 'newTransgene',
      then: yup.string().required('Construction details are required'),
    }),
    detectionMethod: yup.string().required('Detection method is required'),
    dnaSequence: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string(),
        }),
      )
      .when(['detectionMethod'], {
        is: val => val === 'newTransgene',
        then: yup
          .array()
          .of(
            yup.object().shape({
              name: yup.string(),
            }),
          )
          .min(1, 'Provide at least one DNA sequence')
          .max(10)
          .compact(val => val.name === ''),
      }),
    expressionPattern: yup.string().required('Expression pattern is required'),
    fusionType: yup.string().when(['detectionMethod'], {
      is: val => val === 'newTransgene',
      then: yup.string().required('Fusion type is required'),
    }),
    genotype: yup.string().when(['detectionMethod'], {
      is: val => val === 'newTransgene',
      then: yup.string().required('Genotype is required'),
    }),
    injectionConcentration: yup.string(),
    inSituDetails: yup.string().when(['detectionMethod'], {
      is: val => val === 'inSituHybridization',
      then: yup.string().required('In Situ Details are required'),
    }),
    integratedBy: yup.string(),
    observeExpression: yup
      .object()
      .shape({
        certainly: yup.array().of(
          yup.object().shape({
            certainly: yup.object().shape({
              id: yup.string().required(),
              value: yup.string(),
            }),
            during: yup.object().shape({
              id: yup.string().required(),
              value: yup.string(),
            }),
            id: yup.string(),
            subcellularLocalization: yup.object().shape({
              id: yup.string().required(),
              value: yup.string(),
            }),
          }),
        ),
        not: yup.array().of(
          yup.object().shape({
            during: yup.object().shape({
              id: yup.string().required(),
              value: yup.string(),
            }),
            id: yup.string(),
            not: yup.object().shape({
              id: yup.string().required(),
              value: yup.string(),
            }),
            subcellularLocalization: yup.object().shape({
              id: yup.string().required(),
              value: yup.string(),
            }),
          }),
        ),
        partially: yup.array().of(
          yup.object().shape({
            during: yup.object().shape({
              id: yup.string().required(),
              value: yup.string(),
            }),
            id: yup.string(),
            partially: yup.object().shape({
              id: yup.string().required(),
              value: yup.string(),
            }),
            subcellularLocalization: yup.object().shape({
              id: yup.string().required(),
              value: yup.string(),
            }),
          }),
        ),
        possibly: yup.array().of(
          yup.object().shape({
            during: yup.object().shape({
              id: yup.string().required(),
              value: yup.string(),
            }),
            id: yup.string(),
            possibly: yup.object().shape({
              id: yup.string().required(),
              value: yup.string(),
            }),
            subcellularLocalization: yup.object().shape({
              id: yup.string().required(),
              value: yup.string(),
            }),
          }),
        ),
      })
      .test('observe expression test', 'Fill in at least one field', val => {
        const flatFirstLevel = reduce(values(val), (result, item) =>
          concat(result, item),
        )

        let flatValues = []

        flatFirstLevel.forEach(obj => {
          flatValues = concat(
            flatValues,
            values(obj).filter(item => !isString(item)),
          )
        })

        return flatValues.find(item => {
          if (!item.id) return false
          return item.value && item.value.length > 0
        })
      }),
    reporter: yup.string().when(['detectionMethod'], {
      is: val => val === 'newTransgene',
      then: yup.string().required('Reporter is required'),
    }),
    species: yup.string().required('Species is required'),
    strain: yup.string(),
    transgeneName: yup.string().when(['detectionMethod'], {
      is: val => val === 'newTransgene',
      then: yup.string().required('Transgene name is required'),
    }),
    transgeneUsed: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string(),
        }),
      )
      .when(['detectionMethod'], {
        is: val => val === 'existingTransgene',
        then: yup
          .array()
          .of(
            yup.object().shape({
              name: yup.string(),
            }),
          )
          .min(1, 'Provide at least one transgene')
          .max(10)
          .compact(val => val.name === ''),
      }),
    utr: yup.string(),
    variation: yup.string().when(['detectionMethod'], {
      is: val => val === 'genomeEditing',
      then: yup.string().required('Variation is required'),
    }),
  }),
}

const makeSchema = vals => {
  const schema = cloneDeep(initial)
  const { status } = vals

  if (status.initialSubmission) {
    merge(schema, selectDataType)
  }

  if (status.dataTypeSelected) {
    if (vals.dataType === 'geneExpression') {
      merge(schema, geneExpression)
    }
  }

  return yup.object().shape(schema)
}

export default makeSchema
