import * as yup from 'yup'
import { cloneDeep } from 'lodash'
// import { each, get, keys, merge, set } from 'lodash'
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

export const makeSchema = values => {
  const schema = cloneDeep(initial)
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
