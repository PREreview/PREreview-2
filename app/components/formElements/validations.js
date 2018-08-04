import * as yup from 'yup'
// import { each, get, keys, merge, set } from 'lodash'
import { cloneDeep, concat, isString, merge, reduce, values } from 'lodash'
// import flatten, { unflatten } from 'flat'

// import { validateYupSchema, yupToFormErrors } from 'formik'

const initial = {
  author: yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email adress'),
    name: yup.string().required('Name is required'),
    wbPersonId: yup.string(),
  }),
  coAuthors: yup.array(
    yup.object().shape({
      name: yup.string(),
    }),
  ),
  disclaimer: yup.boolean().test('disclaimer', 'Required', val => val),
  funding: yup.string().required('Funding is required'),
  image: yup.object().shape({
    url: yup.string().required('Image is required'),
  }),
  laboratory: yup.string().required('Laboratory is required'),
  patternDescription: yup.string().required('Pattern description is required'),
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

const validationSchema = yup.object().shape({
  author: yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email adress'),
    name: yup.string().required('Name is required'),
    wbPersonId: yup.string(),
  }),
  coAuthors: yup.array(
    yup.object().shape({
      name: yup.string(),
    }),
  ),
  disclaimer: yup.boolean().test('disclaimer', 'Required', val => val),
  funding: yup.string().required('Funding is required'),
  geneExpression: yup.object().shape({
    antibodyUsed: yup.string().when('detectionMethod', {
      is: val => val === 'antibody',
      then: yup.string().required('Antibody is required'),
    }),
    backboneVector: yup.string(),
    coinjected: yup.string(),
    constructComments: yup.string(),
    constructionDetails: yup.string().when('detectionMethod', {
      is: val => val === 'newTransgene',
      then: yup.string().required('Construction details are required'),
    }),
    detectionMethod: yup
      .string()
      .oneOf([
        'antibody',
        'existingTransgene',
        'genomeEditing',
        'inSituHybridization',
        'newTransgene',
        'RT-PCR',
      ]),
    expressionPattern: yup.string().required('Expression Pattern is required'),
    fusionType: yup.string().when('detectionMethod', {
      is: val => val === 'newTransgene',
      then: yup.string().required('Fusion type is required'),
    }),
    genotype: yup.string().when('detectionMethod', {
      is: val => val === 'newTransgene',
      then: yup.string().required('Genotype is required'),
    }),
    injectionConcentration: yup.string(),
    inSituDetails: yup.string().when('detectionMethod', {
      is: val => val === 'inSituHybridization',
      then: yup.string().required('In situ details are required'),
    }),
    integratedBy: yup.string(),
    reporter: yup.string().when('detectionMethod', {
      is: val => val === 'newTransgene',
      then: yup.string().required('Reporter is required'),
    }),
    species: yup.string().required('Species is required'),
    strain: yup.string(),
    transgeneName: yup.string().when('detectionMethod', {
      is: val => val === 'newTransgene',
      then: yup.string().required('Transgene name is required'),
    }),
    utr: yup.string(),
    variation: yup.string().when('detectionMethod', {
      is: val => val === 'genomeEditing',
      then: yup.string().required('Variation is required'),
    }),
  }),
  laboratory: yup.string().required('Laboratory is required'),
  title: yup.string().required('Title is required'),
})
// }

// const validate = (values, props) => {
//   let errors = {}

//   // console.log(values)
//   // const flatValues = flatten(values)
//   // console.log(flatValues)
//   // // keys(flatValues, key => {
//   // //   console.log('key', key)
//   // //   errors[key] = validationSchema[key].validate(values[key])
//   // // })
//   // console.log(validationSchema)

//   // each(keys(flatValues), key => {
//   //   console.log('key', key)
//   //   const currentValidation = get(validationSchema.fields, key)
//   //   console.log(currentValidation)
//   //   if (currentValidation) {
//   //     // console.log(currentValidation)
//   //     errors[key] = currentValidation.validate(values[key])
//   //   }
//   // })

//   // console.log(errors)

//   // console.log('this thing', validateYupSchema(values, validationSchema))
//   return validateYupSchema(values, validationSchema).catch(err => {
//     const yupErrors = yupToFormErrors(err)
//     // console.log('yup', yupErrors)
//     errors = merge(yupErrors, errors)
//     // console.log(errors)

//     if (keys(errors).length) throw errors
//   })

//   // return unflatten(errors)
// }

// const validate = (vals, props) => {
//   const errors = {}
//   // console.log(values['author.name'])
//   const values = flatten(vals)

//   const required = (field, message) => {
//     if (!values[field]) errors[field] = message
//   }

//   const isEmail = (field, message) => {
//     console.log('here')
//     if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[field])) {
//       errors[field] = message
//     }
//   }

//   each(keys(values), field => {
//     switch (field) {
//       case 'author.name':
//         required(field, 'Name is required')
//         break
//       case 'author.email':
//         required(field, 'Email is required')
//         isEmail(field, 'Not a valid email')
//         break
//       default:
//       // pass
//     }
//   })

//   // if (!values['author.name']) errors['author.name'] = 'Name is required'

//   if (!values['author.email']) {
//     set(errors, 'author.email', 'Email is required')
//     errors['author.email']
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     // errors.email = 'Invalid email address';
//     set(errors, 'author.email', 'Email is required')
//   }

//   // console.log(errors)
//   console.log(unflatten(errors))
//   return unflatten(errors)
// }

// export default validate

export const makeSchema = vals => {
  const schema = cloneDeep(initial)
  // console.log(vals)

  const { status } = vals
  // console.log(status)
  if (status.initialSubmission) {
    // console.log('initial yes')
    merge(schema, selectDataType)
  }

  if (status.dataTypeSelected) {
    if (vals.dataType === 'geneExpression') {
      merge(schema, geneExpression)
    }
  }

  // console.log(schema)

  return yup.object().shape(schema)
}

export default validationSchema
// export default

/*
  ATTEMPT AT ASYNC AUTHOR CHECK
*/

/* eslint-disable-next-line func-names, prefer-arrow-callback */
// .test('jfj', 'fjjfjf', function(val) {
//   // console.log('this', val, a)
//   // console.log('that', this.path)
//   const { wbPersonId } = this.parent
//   const wbPersonExists =
//     typeof wbPersonId !== 'undefined' && wbPersonId.length > 0
//   // console.log(val.length > 0)
//   // console.log(wbPersonExists)
//   if (val.length === 0) return true
//   return wbPersonExists
//   // return val.length > 0 && wbPersonExists
//   // return val.length < 0 && !wbPersonExists
//   // return val.length > 0
// }),
/* eslint-disable-next-line func-names, prefer-arrow-callback */
// .test('is-wb-person', 'Not a WB person', function(val) {
//   if (val.length === 0) return true
//   // const { host, port } = config['pubsweet-client']
//   // const url = `${host}${port}/wb/validate/wb-person`
//   // return fetch(url)
//   //   .then(response => response.json())
//   //   .then(data => console.log(data))
//   // console.log('intermediate', this.)

//   const payload = {
//     id: this.parent.wbPersonId,
//     search: val,
//     // typeIdentifier: 'WBPerson',
//   }

//   // console.log(payload)

//   // validateWBPerson(payload)
//   //   .then(response => response.json())
//   //   .then(data => {
//   //     console.log('it is', data)
//   //     return data
//   //   })
//   // console.log('start', debounced)
//   if (debounced) debounced.cancel()
//   // console.log('after cancel', debounced)

//   debounced = debounce(
//     () =>
//       validateWBPerson(payload)
//         .then(response => response.json())
//         .then(data => {
//           console.log('it is', data)
//           return data
//         })
//         .catch(err => console.log(err)),
//     500,
//     {
//       leading: false,
//       trailing: true,
//     },
//   )

//   // console.log('end', debounced)

//   debounced()
// }),
// .when(['wbPersonId'], {
//   is: val => {
//     // console.log(props)
//     return typeof val === 'undefined' || val.length === 0
//   },
//   then: yup.string().typeError('Not a valid WB person'),
// }),
