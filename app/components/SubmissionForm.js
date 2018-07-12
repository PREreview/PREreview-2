/* eslint-disable react/prop-types */

import React from 'react'
import { Form } from 'formik'
import { get } from 'lodash'

import AutoComplete from './formElements/AutoComplete'
import Checkbox from './formElements/Checkbox'
import Dropdown from './formElements/Dropdown'
import Image from './formElements/Image'
import ObserveExpression from './formElements/ObserveExpression'
import Radio from './formElements/Radio'
import TextField from './formElements/TextField'
import TextEditor from './formElements/TextEditor'
import TextFieldGroup from './formElements/TextFieldGroup'
import {
  getWBPerson,
  getWBLaboratory,
  getWBSpecies,
  getWBGene,
  getTransgene,
  getReporter,
  getBackboneVector,
  getFusionType,
  getIntegrationMethod,
} from '../fetch/WBApi'

const options = {
  dataType: [
    {
      label: 'Gene expression results',
      value: 'geneExpression',
    },
  ],
  detectionMethod: [
    {
      label: 'Antibody',
      value: 'antibody',
    },
    {
      label: 'In-situ Hybridization',
      value: 'inSituHybridization',
    },
    {
      label: 'Genome Editing',
      value: 'genomeEditing',
    },
    {
      label: 'Existing Transgene',
      value: 'existingTransgene',
    },
    {
      label: 'New Transgene',
      value: 'newTransgene',
    },
    {
      label: 'RT-PCR',
      value: 'rtPcr',
    },
  ],
}

const authorSuggestionSelected = (event, authorOptions, setFieldValue) => {
  // const { name, onSuggestionSelected, setValues } = this.props

  // if (onSuggestionSelected) onSuggestionSelected(event, authorOptions)
  // formik specific -- cannot stay here if this moves to ui lib
  // if (setFieldValue) setFieldValue(name, authorOptions.suggestionValue)
  // if (setValues) setValues({
  //   'author.name':
  // })
  // console.log(authorOptions)
  // console.log(setFieldValue)
  setFieldValue('author.wbPersonId', authorOptions.suggestion.wbPersonId)
}

const SubmissionForm = props => {
  const { values } = props
  // console.log(values)
  // console.log(props.errors)

  return (
    <Form>
      <AutoComplete
        fetchData={getWBPerson}
        label="Name"
        name="author.name"
        onChange={props.handleChange}
        onSuggestionSelected={authorSuggestionSelected}
        placeholder="Please type in your name"
        required
        value={get(values, 'author.name')}
        {...props}
      />

      <TextField
        label="Email address"
        name="author.email"
        placeholder="this is the email"
        required
        value={get(values, 'author.email')}
        {...props}
      />

      <TextFieldGroup
        data={getWBPerson}
        handleChange={props.handleChange}
        label="Co-Authors"
        name="coAuthors"
        placeholder="Please type a co-author's name"
        {...props}
      />

      <AutoComplete
        fetchData={getWBLaboratory}
        label="Laboratory"
        name="laboratory"
        onChange={props.handleChange}
        placeholder="Please type in the laboratory"
        required
        value={get(values, 'laboratory')}
        {...props}
      />

      <TextField
        label="Funding"
        name="funding"
        placeholder="this is the funding"
        required
        value={get(values, 'funding')}
        {...props}
      />

      <Image label="Image" required />

      <TextEditor
        label="Pattern description"
        placeholder="Provide a description for the pattern"
        required
      />

      <TextField
        label="Title"
        name="title"
        placeholder="this is the title"
        required
        value={get(values, 'title')}
        {...props}
      />

      <TextField
        label="Acknowledgements"
        name="acknowledgements"
        placeholder="this is the acknowledgements"
        value={get(values, 'acknowledgements')}
        {...props}
      />

      <AutoComplete
        fetchData={getWBPerson}
        label="Suggested Reviewer"
        name="suggestedReviewer"
        onChange={props.handleChange}
        placeholder="this is the suggestedReviewer"
        value={get(values, 'suggestedReviewer')}
        {...props}
      />

      <Checkbox
        checked={get(values, 'disclaimerChecked')}
        label="Disclaimer"
        name="disclaimerChecked"
        onChange={props.handleChange}
        required
        text="I agree to the terms of publication"
        value={get(values, 'disclaimerChecked')}
        {...props}
      />

      <TextEditor
        label="Comments"
        placeholder="Provide a description for the pattern"
      />

      <Dropdown label="Choose a datatype" options={options.dataType} />

      <AutoComplete
        fetchData={getWBSpecies}
        label="Species"
        name="geneExpression.species"
        onChange={props.handleChange}
        placeholder="Please type in the species"
        required
        value={get(values, 'geneExpression.species')}
        {...props}
      />

      <AutoComplete
        fetchData={getWBGene}
        label="Expression pattern for gene"
        name="geneExpression.expressionPattern"
        onChange={props.handleChange}
        placeholder="Please type in expression pattern for the gene"
        required
        value={get(values, 'geneExpression.expressionPattern')}
        {...props}
      />

      <Radio
        label="Choose a detection method"
        name="geneExpression.detectionMethod"
        options={options.detectionMethod}
        required
        {...props}
      />

      {values.geneExpression.detectionMethod === 'antibody' && (
        <TextField
          label="Antibody used"
          name="geneExpression.antibodyUsed"
          placeholder="Please type in antibody used"
          required
          value={get(values, 'geneExpression.antibodyUsed')}
          {...props}
        />
      )}

      {values.geneExpression.detectionMethod === 'inSituHybridization' && (
        <TextField
          label="In-Situ details"
          name="geneExpression.inSituDetails"
          placeholder="Please type in in-situ details"
          required
          value={get(values, 'geneExpression.inSituDetails')}
          {...props}
        />
      )}

      {values.geneExpression.detectionMethod === 'genomeEditing' && (
        <TextField
          label="Variation"
          name="geneExpression.variation"
          placeholder="Please type in variation"
          value={get(values, 'geneExpression.variation')}
          {...props}
        />
      )}

      {values.geneExpression.detectionMethod === 'existingTransgene' && (
        <TextFieldGroup
          data={getTransgene}
          handleChange={props.handleChange}
          label="Transgene Used"
          maxItems={10}
          name="geneExpression.transgeneUsed"
          placeholder="Type a transgene"
          required
          {...props}
        />
      )}

      {values.geneExpression.detectionMethod === 'newTransgene' && (
        <React.Fragment>
          <TextField
            label="Genotype"
            name="geneExpression.genotype"
            placeholder="Please type in genotype"
            required
            value={get(values, 'geneExpression.genotype')}
            {...props}
          />

          <TextField
            label="Construction Details"
            name="geneExpression.constructionDetails"
            placeholder="Please type in construction details"
            required
            value={get(values, 'geneExpression.constructionDetails')}
            {...props}
          />

          <TextFieldGroup
            handleChange={props.handleChange}
            label="DNA Sequence"
            maxItems={10}
            name="geneExpression.dnaSequence"
            placeholder="Type a DNA sequence"
            required
            {...props}
          />

          <AutoComplete
            fetchData={getWBGene}
            label="3' UTR"
            name="geneExpression.utr"
            onChange={props.handleChange}
            placeholder="Please type in 3' UTR"
            value={get(values, 'geneExpression.utr')}
            {...props}
          />

          <AutoComplete
            fetchData={getReporter}
            label="Reporter"
            name="geneExpression.reporter"
            onChange={props.handleChange}
            placeholder="Please type in reporter"
            required
            value={get(values, 'geneExpression.reporter')}
            {...props}
          />

          <AutoComplete
            fetchData={getBackboneVector}
            label="Backbone Vector"
            name="geneExpression.backboneVector"
            onChange={props.handleChange}
            placeholder="Please type in Backbone Vector"
            value={get(values, 'geneExpression.backboneVector')}
            {...props}
          />

          <AutoComplete
            fetchData={getFusionType}
            label="Fusion Type"
            name="geneExpression.fusionType"
            onChange={props.handleChange}
            placeholder="Please type in fusion type"
            required
            value={get(values, 'geneExpression.fusionType')}
            {...props}
          />

          <TextField
            label="Transgene Name"
            name="geneExpression.transgeneName"
            placeholder="Please type in Transgene Name"
            required
            value={get(values, 'geneExpression.transgeneName')}
            {...props}
          />

          <TextField
            label="Construct Comments"
            name="geneExpression.constructComments"
            placeholder="Please type in Construct Comments"
            value={get(values, 'geneExpression.constructComments')}
            {...props}
          />

          <TextField
            label="Strain"
            name="geneExpression.strain"
            placeholder="Please type in Strain"
            value={get(values, 'geneExpression.strain')}
            {...props}
          />

          <TextField
            label="Coinjected"
            name="geneExpression.coinjected"
            placeholder="Please type in coinjected"
            value={get(values, 'geneExpression.coinjected')}
            {...props}
          />

          <TextField
            label="Injection Concentration"
            name="geneExpression.injectionConcentration"
            placeholder="Please type in Injection Concentration"
            value={get(values, 'geneExpression.injectionConcentration')}
            {...props}
          />

          <AutoComplete
            fetchData={getIntegrationMethod}
            label="Integrated by"
            name="geneExpression.integratedBy"
            onChange={props.handleChange}
            placeholder="Please type in Integrated by"
            value={get(values, 'geneExpression.integratedBy')}
            {...props}
          />
        </React.Fragment>
      )}

      <ObserveExpression />
    </Form>
  )
}

export default SubmissionForm
