/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'
import Dropzone from 'react-dropzone'
import { get } from 'lodash'

import { th } from '@pubsweet/ui-toolkit'

// TO DO -- extract Labels from TextField
const Label = styled.label`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  /* display: block; */
`

const StyledDropzone = styled(Dropzone)`
  /* align-items: center; */
  border: 1px dashed ${th('colorFurniture')};
  border-radius: 5px;
  display: flex;
  height: calc(${th('gridUnit')} * 12);
  /* justify-content: center; */
  margin-top: ${th('gridUnit')};
  width: 400px;

  /* div {
    position: unset;
  } */

  p {
    align-self: center;
    color: ${th('colorTextPlaceholder')};
    flex-grow: 1;
    text-align: center;
  }
`

const Img = styled.img`
  max-width: 600px;
`

class DropArea extends React.Component {
  constructor(props) {
    super(props)

    // console.log(props)

    const file = {
      name: props.values.image.name,
      preview: `/uploads/${props.values.image.url}`,
      url: props.values.image.url,
    }

    this.state = {
      file,
    }
  }

  // handleClick = () => {
  //   const { name, setFieldTouched } = this.props
  //   setFieldTouched(name, true)
  // }

  handleDrop = fileList => {
    const file = fileList[0]
    const { name, setFieldValue } = this.props

    // console.log(file)
    // console.log('event', e)
    this.setState({
      file,
    })

    // console.log(this.props)
    // this.props.handleChange()

    setFieldValue(name, {
      file,
      url: file.preview,
    })
  }

  render() {
    const { file } = this.state

    return (
      <div>
        <StyledDropzone
          accept="image/*"
          // onClick={this.handleClick}
          onDrop={this.handleDrop}
          style={{}}
        >
          <p>
            Drop an image here {file && 'to replace current'} <br /> or click to
            select
          </p>
        </StyledDropzone>
        {file && <Img alt="" src={file.preview} />}
        {file && (
          <div>
            {/* <a href={file.url}> */}
            {file.name}
            {/* </a> */}
          </div>
        )}
      </div>
    )
  }
}

const StyledDropArea = styled(DropArea)`
  div > div:first-of-type {
    border-style: solid;
    height: 200px;
    width: 400px;
  }
`

const Error = styled.span`
  color: ${th('colorError')};
  font-size: ${th('fontSizeBaseSmall')};
  padding-left: ${th('gridUnit')};
`

const Wrapper = styled.div`
  margin-bottom: calc(${th('gridUnit')} * 2);
`

const Image = props => {
  // console.log(props)
  const error = get(props.errors, 'image.url')
  const touched = get(props.touched, 'image')
  // console.log('img error', error)

  return (
    <Wrapper>
      {props.label && (
        <React.Fragment>
          <Label>{`${props.label}${props.required && ' *'}`}</Label>
          {touched && <Error>{error}</Error>}
        </React.Fragment>
      )}
      <StyledDropArea {...props} />
    </Wrapper>
  )
}

export default Image
