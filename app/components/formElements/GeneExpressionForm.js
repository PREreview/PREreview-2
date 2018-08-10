/* eslint-disable react/prop-types */

import React from 'react'
import { get } from 'lodash'

import {
  // getBackboneVector,
  // getFusionType,
  // getIntegrationMethod,
  // getReporter,
  getTransgene,
  getWBGene,
  getWBSpecies,
  getVariation,
} from '../../fetch/WBApi'

import AutoComplete from './AutoComplete'
import Radio from './Radio'
// import ObserveExpression from './ObserveExpression'
import TextField from './TextField'
import TextFieldGroup from './TextFieldGroup'

import { onAutocompleteChange, onSuggestionSelected } from './helpers'

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
  const { errors, handleChange, setFieldValue, values } = props

  // console.log(props.errors)

  return (
    <React.Fragment>
      <AutoComplete
        error={get(errors, 'geneExpression.species.name')}
        fetchData={getWBSpecies}
        label="Species"
        name="geneExpression.species.name"
        onChange={e => {
          onAutocompleteChange(
            e,
            'geneExpression.species.name',
            setFieldValue,
            handleChange,
          )
        }}
        onSuggestionSelected={onSuggestionSelected}
        placeholder="Please type in the species"
        required
        value={get(values, 'geneExpression.species.name')}
        {...props}
      />

      <AutoComplete
        error={get(errors, 'geneExpression.expressionPattern.name')}
        fetchData={getWBGene}
        label="Expression pattern for gene"
        name="geneExpression.expressionPattern.name"
        onChange={e => {
          onAutocompleteChange(
            e,
            'geneExpression.expressionPattern.name',
            setFieldValue,
            handleChange,
          )
        }}
        onSuggestionSelected={onSuggestionSelected}
        placeholder="Please type in expression pattern for the gene"
        required
        value={get(values, 'geneExpression.expressionPattern.name')}
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
          error={get(errors, 'geneExpression.antibodyUsed')}
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
          error={get(errors, 'geneExpression.inSituDetails')}
          label="In-Situ details"
          name="geneExpression.inSituDetails"
          placeholder="Please type in in-situ details"
          required
          value={get(values, 'geneExpression.inSituDetails')}
          {...props}
        />
      )}

      {values.geneExpression.detectionMethod === 'genomeEditing' && (
        <AutoComplete
          error={get(errors, 'geneExpression.variation.name')}
          fetchData={getVariation}
          label="Variation"
          name="geneExpression.variation.name"
          onChange={e => {
            onAutocompleteChange(
              e,
              'geneExpression.variation.name',
              setFieldValue,
              handleChange,
            )
          }}
          onSuggestionSelected={onSuggestionSelected}
          placeholder="Please type in variation"
          required
          value={get(values, 'geneExpression.variation.name')}
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
            error={get(errors, 'geneExpression.genoType')}
            label="Genotype"
            name="geneExpression.genotype"
            placeholder="Please type in genotype"
            required
            value={get(values, 'geneExpression.genotype')}
            {...props}
          />

          <TextField
            error={get(errors, 'geneExpression.constructionDetails')}
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

          {/* <AutoComplete
            error={get(errors, 'geneExpression.utr.name')}
            fetchData={getWBGene}
            label="3' UTR"
            name="geneExpression.utr.name"
            onChange={props.handleChange}
            placeholder="Please type in 3' UTR"
            value={get(values, 'geneExpression.utr.name')}
            {...props}
          />

          <AutoComplete
            error={get(errors, 'geneExpression.reporter.name')}
            fetchData={getReporter}
            label="Reporter"
            name="geneExpression.reporter.name"
            onChange={props.handleChange}
            placeholder="Please type in reporter"
            required
            value={get(values, 'geneExpression.reporter.name')}
            {...props}
          />

          <AutoComplete
            error={get(errors, 'geneExpression.backboneVector.name')}
            fetchData={getBackboneVector}
            label="Backbone Vector"
            name="geneExpression.backboneVector.name"
            onChange={props.handleChange}
            placeholder="Please type in Backbone Vector"
            value={get(values, 'geneExpression.backboneVector.name')}
            {...props}
          />

          <AutoComplete
            error={get(errors, 'geneExpression.fusionType.name')}
            fetchData={getFusionType}
            label="Fusion Type"
            name="geneExpression.fusionType.name"
            onChange={props.handleChange}
            placeholder="Please type in fusion type"
            required
            value={get(values, 'geneExpression.fusionType.name')}
            {...props}
          />

          <TextField
            error={get(errors, 'geneExpression.transgeneName')}
            label="Transgene Name"
            name="geneExpression.transgeneName"
            placeholder="Please type in Transgene Name"
            required
            value={get(values, 'geneExpression.transgeneName')}
            {...props}
          />

          <TextField
            error={get(errors, 'geneExpression.constructComments')}
            label="Construct Comments"
            name="geneExpression.constructComments"
            placeholder="Please type in Construct Comments"
            value={get(values, 'geneExpression.constructComments')}
            {...props}
          />

          <TextField
            error={get(errors, 'geneExpression.strain')}
            label="Strain"
            name="geneExpression.strain"
            placeholder="Please type in Strain"
            value={get(values, 'geneExpression.strain')}
            {...props}
          />

          <TextField
            error={get(errors, 'geneExpression.coinjected')}
            label="Coinjected"
            name="geneExpression.coinjected"
            placeholder="Please type in coinjected"
            value={get(values, 'geneExpression.coinjected')}
            {...props}
          />

          <TextField
            error={get(errors, 'geneExpression.injectionConcentration')}
            label="Injection Concentration"
            name="geneExpression.injectionConcentration"
            placeholder="Please type in Injection Concentration"
            value={get(values, 'geneExpression.injectionConcentration')}
            {...props}
          />

          <AutoComplete
            error={get(errors, 'geneExpression.integratedBy.name')}
            fetchData={getIntegrationMethod}
            label="Integrated by"
            name="geneExpression.integratedBy.name"
            onChange={props.handleChange}
            placeholder="Please type in Integrated by"
            value={get(values, 'geneExpression.integratedBy.name')}
            {...props}
          /> */}
        </React.Fragment>
      )}

      {/* <ObserveExpression
        error={get(props.errors, 'geneExpression.observeExpression')}
        name="geneExpression.observeExpression"
        // touched={get(props.touched, 'geneExpression.observeExpression')}
        value={get(values, 'geneExpression.observeExpression')}
        {...props}
      /> */}
    </React.Fragment>
  )
}

export default GeneExpressionForm
