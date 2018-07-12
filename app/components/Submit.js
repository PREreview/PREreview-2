import React from 'react'
import { Formik } from 'formik'
// import { get, set } from 'lodash'

import * as yup from 'yup'

import Loading from './Loading'
import SubmissionForm from './SubmissionForm'

import fakeData from '../queries/fakeData'

const validationSchema = yup.object().shape({
  author: yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email adress'),
    name: yup
      .string()
      .required('Name is required')
      /* eslint-disable-next-line func-names, prefer-arrow-callback */
      .test('jfj', 'fjjfjf', function(val) {
        // console.log('this', val, a)
        // console.log('that', this.path)
        const { wbPersonId } = this.parent
        const wbPersonExists =
          typeof wbPersonId !== 'undefined' && wbPersonId.length > 0
        // console.log(val.length > 0)
        // console.log(wbPersonExists)
        if (val.length === 0) return true
        return wbPersonExists
        // return val.length > 0 && wbPersonExists
        // return val.length < 0 && !wbPersonExists
        // return val.length > 0
      }),
    // .when(['wbPersonId'], {
    //   is: val => {
    //     // console.log(props)
    //     return typeof val === 'undefined' || val.length === 0
    //   },
    //   then: yup.string().typeError('Not a valid WB person'),
    // }),
    wbPersonId: yup.string(),
  }),
  coAuthors: yup.array(
    yup.object().shape({
      name: yup.string(),
    }),
  ),
  disclaimerChecked: yup.boolean().test('disclaimer', 'Required', val => val),
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

const onSubmit = () => {}

class Submit extends React.Component {
  constructor(props) {
    super(props)
    this.validated = false

    this.state = {
      loading: true,
    }
  }

  componentDidUpdate() {
    if (this.form && !this.validated) this.form.runValidations()
  }

  render() {
    if (this.state.loading) {
      setTimeout(() => {
        this.setState({ loading: false })
      }, 100) // 2000)
      return <Loading />
    }

    return (
      <div>
        <h1>Submit your article</h1>
        {/* <p>What joy!</p> */}
        <Formik
          initialValues={fakeData}
          onSubmit={onSubmit}
          ref={c => (this.form = c)}
          render={SubmissionForm}
          // validate={validate}
          validationSchema={validationSchema}
        />
      </div>
    )
  }
}

export default Submit
