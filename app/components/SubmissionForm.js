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
import { getWBPerson, getWBLaboratory, getWBSpecies } from '../fetch/WBApi'

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

const SubmissionForm = props => {
  const { values } = props

  return (
    <Form>
      <AutoComplete
        fetchData={getWBPerson}
        label="Name"
        name="author.name"
        onChange={props.handleChange}
        placeholder="Please type in your name"
        value={get(values, 'author.name')}
        {...props}
      />

      <TextField
        label="Email address"
        name="author.email"
        placeholder="this is the email"
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
        value={get(values, 'laboratory')}
        {...props}
      />

      <TextField
        label="Funding"
        name="funding"
        placeholder="this is the funding"
        value={get(values, 'funding')}
        {...props}
      />

      <Image label="Image" />

      <TextEditor
        label="Pattern description"
        placeholder="Provide a description for the pattern"
      />

      <TextField
        label="Title"
        name="title"
        placeholder="this is the title"
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

      <TextField
        label="Suggested Reviewer"
        name="suggestedReviewer"
        placeholder="this is the suggestedReviewer"
        value={get(values, 'suggestedReviewer')}
        {...props}
      />

      <Checkbox label="Disclaimer" text="I agree to the terms of publication" />

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
        value={get(values, 'geneExpression.species')}
        {...props}
      />

      <TextField
        label="Expression pattern for gene"
        name="geneExpression.expressionPattern"
        placeholder="Please type in expression pattern for the gene"
        value={get(values, 'geneExpression.expressionPattern')}
        {...props}
      />

      <Radio
        label="Choose a detection method"
        name="geneExpression.detectionMethod"
        options={options.detectionMethod}
        {...props}
      />

      {values.geneExpression.detectionMethod === 'antibody' && (
        <TextField
          label="Antibody used"
          name="geneExpression.detectionMethod.antibodyUsed"
          placeholder="Please type in antibody used"
          value={get(values, 'geneExpression.antibodyUsed')}
          {...props}
        />
      )}

      {values.geneExpression.detectionMethod === 'inSituHybridization' && (
        <TextField
          label="In-Situ details"
          name="geneExpression.detectionMethod.inSituDetails"
          placeholder="Please type in in-situ details"
          value={get(values, 'geneExpression.inSituDetails')}
          {...props}
        />
      )}

      {values.geneExpression.detectionMethod === 'genomeEditing' && (
        <TextField
          label="Variation"
          name="geneExpression.detectionMethod.variation"
          placeholder="Please type in variation"
          value={get(values, 'geneExpression.variation')}
          {...props}
        />
      )}

      {values.geneExpression.detectionMethod === 'existingTransgene' && (
        <TextFieldGroup
          handleChange={props.handleChange}
          label="Transgene Used"
          maxItems={10}
          name="geneExpression.transgeneUsed"
          placeholder="Type a transgene"
          {...props}
        />
      )}

      {values.geneExpression.detectionMethod === 'newTransgene' && (
        <React.Fragment>
          <TextField
            label="Genotype"
            name="geneExpression.genotype"
            placeholder="Please type in genotype"
            value={get(values, 'geneExpression.genotype')}
            {...props}
          />

          <TextField
            label="Construction Details"
            name="geneExpression.constructionDetails"
            placeholder="Please type in construction details"
            value={get(values, 'geneExpression.constructionDetails')}
            {...props}
          />

          <TextFieldGroup
            handleChange={props.handleChange}
            label="DNA Sequence"
            maxItems={10}
            name="geneExpression.dnaSequence"
            placeholder="Type a DNA sequence"
            {...props}
          />

          <TextField
            label="3' UTR"
            name="geneExpression.utr"
            placeholder="Please type in 3' UTR"
            value={get(values, 'geneExpression.utr')}
            {...props}
          />

          <TextField
            label="Reporter"
            name="geneExpression.reporter"
            placeholder="Please type in reporter"
            value={get(values, 'geneExpression.reporter')}
            {...props}
          />

          <TextField
            label="Backbone Vector"
            name="geneExpression.backboneVector"
            placeholder="Please type in Backbone Vector"
            value={get(values, 'geneExpression.backboneVector')}
            {...props}
          />

          <TextField
            label="Fusion Type"
            name="geneExpression.fusionType"
            placeholder="Please type in fusion type"
            value={get(values, 'geneExpression.fusionType')}
            {...props}
          />

          <TextField
            label="Transgene Name"
            name="geneExpression.transgeneName"
            placeholder="Please type in Transgene Name"
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

          <TextField
            label="Integrated by"
            name="geneExpression.integratedBy"
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
