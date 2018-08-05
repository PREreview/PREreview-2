/* eslint-disable react/prop-types */

import React from 'react'
import { get } from 'lodash'

import {
  getBackboneVector,
  getFusionType,
  getIntegrationMethod,
  getReporter,
  getTransgene,
  getWBGene,
  getWBSpecies,
} from '../../fetch/WBApi'

import AutoComplete from './AutoComplete'
import Radio from './Radio'
import ObserveExpression from './ObserveExpression'
import TextField from './TextField'
import TextFieldGroup from './TextFieldGroup'

const options = {
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

const GeneExpressionForm = props => {
  const { values } = props

  // console.log(props.errors)

  return (
    <React.Fragment>
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
        error={get(props.errors, 'geneExpression.detectionMethod')}
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

      <ObserveExpression
        error={get(props.errors, 'geneExpression.observeExpression')}
        name="geneExpression.observeExpression"
        // touched={get(props.touched, 'geneExpression.observeExpression')}
        value={get(values, 'geneExpression.observeExpression')}
        {...props}
      />
    </React.Fragment>
  )
}

export default GeneExpressionForm
