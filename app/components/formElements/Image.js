/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'
import Dropzone from 'react-dropzone'

import { th } from '@pubsweet/ui-toolkit'

// TO DO -- extract Labels from TextField
const Label = styled.label`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  display: block;
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

    // TO DO -- wasn't the bind thing fixed?
    this.handleDrop = this.handleDrop.bind(this)

    this.state = {
      file: props.file,
    }
  }

  handleDrop(fileList) {
    this.setState({
      file: fileList[0],
    })
  }

  render() {
    const { file } = this.state

    return (
      <div>
        <StyledDropzone accept="image/*" onDrop={this.handleDrop} style={{}}>
          <p>
            Drop an image here {file && 'to replace current'} <br /> or click to
            select
          </p>
        </StyledDropzone>
        {file && <Img alt="" src={file.preview} />}
        {file && <div>{file.name}</div>}
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

const Wrapper = styled.div`
  margin-bottom: calc(${th('gridUnit')} * 2);
`

const Image = ({ label }) => (
  <Wrapper>
    {label && <Label>{label}</Label>}
    <StyledDropArea />
  </Wrapper>
)

export default Image
