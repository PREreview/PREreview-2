/* eslint-disable react/prop-types */

import React from 'react'
import styled, { css } from 'styled-components'
import { get, isEmpty, omit, pickBy, values } from 'lodash'
// import AutoComplete from 'react-autocomplete'

import { TextField as UiTextField } from '@pubsweet/ui'
import { fadeIn, th } from '@pubsweet/ui-toolkit'

import config from 'config'

const StyledTextField = styled(UiTextField)`
  line-height: ${th('lineHeightBase')};
  margin-bottom: calc(${th('gridUnit')} * 3);
  width: calc(${th('gridUnit')} * 50);

  input {
    height: calc(${th('gridUnit')} * 4);
  }

  ${props =>
    /* console.log(props) && */
    props.autoCompleteOpen &&
    css`
      margin-bottom: 0;
    `};
`

const Error = styled.div`
  align-self: flex-end;
  /* animation: ${fadeIn} ${th('transitionDuration')}; */
  color: ${th('colorError')};
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  margin: 0 0 calc(${th('gridUnit')} * 3) calc(${th('gridUnit')} * 2);
`

// TO DO -- extract Labels from TextField
const Label = styled.label`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  padding: 10px 10px 0 0;
`

const Wrapper = styled.div`
  display: flex;

  ${props =>
    props.inline &&
    css`
      /* width: 600px; */
      justify-content: space-between;
    `};

  ${props =>
    /* console.log('huh', props.autoComplete) && */
    props.autoComplete &&
    css`
      /* background: blue; */
      flex-direction: column;

      div:last-child: {
        margin-bottom: calc(${th('gridUnit')} * 3);
      }
    `};
`

const Field = ({
  // error,
  handleBlur,
  handleChange,
  inline,
  label,
  name,
  touched,
  value,
  ...props
}) => {
  // const {
  //   error,
  //   handleBlur,
  //   handleChange,
  //   inline,
  //   label,
  //   name,
  //   touched,
  //   value,
  // } = props
  // label === 'Name' && console.log(handleChange)
  // console.log(props)
  const error = get(props.errors, name)
  const touchedThis = get(touched, name)

  const showError = () => {
    // console.log(!touched[name])
    // console.log(values[name])
    // if (name == 'author.email') console.log(error)

    if (touchedThis && error) return true
    if (!touchedThis && value && error) return true
    return false
  }

  const validationStatus = () => {
    if (showError()) return 'error'
    return 'default'
  }

  // const onChange = e => {
  //   console.log(this.props)
  //   handleChange(e)
  //   props.onChange && console.log('has') && props.onChange()
  // }

  // console.log(label)
  // console.log(label === 'Name' && showError())

  return (
    <FieldWithError autoCompleteOpen={props.autoCompleteOpen}>
      <StyledTextField
        innerRef={props.ref}
        label={inline ? null : label}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        // onChange={onChange}
        validationStatus={validationStatus()}
        value={value}
        {...props}
      />
      {showError() && <Error>{error}</Error>}
    </FieldWithError>
  )
}

const FieldWithError = styled.div`
  display: inline-flex;

  /* stylelint-disable no-duplicate-selectors */
  ${Error} {
    ${props =>
      props.autoCompleteOpen &&
      css`
        margin-bottom: 0;
      `};
  }
`

// const AutoComp = props => {
//   return (
//     <AutoComplete
//       getItemValue={item => item.label}
//       inputProps={props}
//       // inputRef={el => (this.input = el)}
//       items={[
//         {
//           label: 'one',
//         },
//         {
//           label: 'two',
//         },
//       ]}
//       ref={el => (this.input = el)}
//       renderInput={({ ...rest }) => <Field {...rest} />}
//       renderItem={(item, isHighlighted) => (
//         <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
//           {item.label}
//         </div>
//       )}
//       // renderMenu={children => {
//       //   console.log(children)
//       //   return <div>{children}</div>
//       // }}
//     />
//   )
// }

const Results = props => {
  const { className, data } = props
  // console.log(data)
  if (isEmpty(data)) return null

  return (
    <div className={className}>
      <ul>{data.map(entry => <div>{entry.name}</div>)}</ul>
    </div>
  )
  // return null
}

const StyledResults = styled(Results)`
  background: ${th('colorBackgroundHue')};
  border: 1px solid ${th('colorBorder')};
  border-radius: 0 0 5px 5px;
  border-top: 0;
  margin: 0 0 calc(${th('gridUnit')} * 3) 0;
  position: absolute;
  width: 400px;

  ul {
    padding: 0;
    margin: 0;
  }

  div {
    border-bottom: 1px solid ${th('colorBorder')};
    /* border-bottom: 0; */
    display: block;
    padding: calc(${th('gridUnit')}) 4px;

    &:last-child {
      border-bottom: 0;
    }
  }
`

class AutoComp extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    // this.getData

    // console.log(props)
    this.state = {
      // data: [
      // {
      //   label: 'One',
      //   value: 'one',
      // },
      // {
      //   label: 'Two',
      //   value: 'two',
      // },
      // ],
      results: [],
    }

    // this.typingDelay = null
  }

  async getData(text) {
    // fetch('https://jsonplaceholder.typicode.com/posts/1')
    //   .then(response => response.json())
    //   .then(json => console.log(json))

    /* eslint-disable-next-line no-console */
    console.log('get em', this.state)
    // console.log(config)

    const { baseUrl } = config['pubsweet-client']
    const url = `${baseUrl}api/wb/users?search=${text}`
    // console.log(url)

    return fetch(url)
    // .then(response => {
    //   // console.log(response)
    //   return response.json()
    // })
    // .then(json => {
    //   console.log(json)
    //   // this.setState({
    //   //   results: json,
    //   // })
    //   return json
    // })
  }

  async handleChange(e) {
    this.props.handleChange(e)

    const word = e.target.value
    // console.log(e.target.value)

    const regex = new RegExp(word, 'gi')

    // const data = await this.getData()
    // .then(response => {
    //   // console.log(response)
    //   return response.json()
    // })
    // .then(json => {
    //   console.log(json)
    //   // this.setState({
    //   //   results: json,
    //   // })
    //   return json
    // })
    let data

    await this.getData(word)
      .then(response =>
        // console.log(response)
        response.json(),
      )
      .then(json => {
        /* eslint-disable-next-line no-console */
        console.log(json)
        // this.setState({
        //   results: json,
        // })
        // return json
        data = json
      })

    // console.log(data)

    const results = pickBy(data.people, item => {
      /* eslint-disable-next-line no-console */
      console.log(item)
      return word.length > 0 && item.name.match(regex)
    })
    // console.log(values(results))
    // console.log(Array.isArray(values(results)))

    // this.getData()

    this.setState({ results: values(results) })
  }

  render() {
    // console.log(this.props)

    // const handleChange = e => {
    //   this.props.handleChange(e)

    //   const word = e.target.value
    //   // console.log(e.target.value)

    //   const regex = new RegExp(word, 'gi')

    //   const results = pickBy(this.getData(), item => {
    //     console.log(item)
    //     return word.length > 0 && item.label.match(regex)
    //   })
    //   // console.log(values(results))
    //   // console.log(Array.isArray(values(results)))

    //   this.getData()

    //   this.setState({ results: values(results) })
    // }

    const handleBlur = e => {
      // console.log('Blur')
      this.props.handleBlur(e)

      this.setState({
        results: [],
      })
    }

    // return (
    //   <AutoComplete
    //     getItemValue={item => item.label}
    //     inputProps={this.props}
    //     // inputRef={el => (this.input = el)}
    //     items={[
    //       {
    //         label: 'one',
    //       },
    //       {
    //         label: 'two',
    //       },
    //     ]}
    //     ref={el => (this.input = el)}
    //     renderInput={a => {
    //       // console.log(this.input)
    //       const inputProps = this.input && this.input.props
    //       return <Field {...inputProps} {...this.props} />
    //     }}
    //     renderItem={(item, isHighlighted) => (
    //       <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
    //         {item.label}
    //       </div>
    //     )}
    //     // renderMenu={children => {
    //     //   console.log(children)
    //     //   return <div>{children}</div>
    //     // }}
    //   />
    // )
    const newProps = omit(this.props, ['handleBlur', 'handleChange'])
    // console.log(this.state.results)

    return (
      <div>
        <Field
          autoCompleteOpen={this.state.results.length > 0}
          handleBlur={handleBlur}
          handleChange={this.handleChange}
          {...newProps}
        />
        {this.state.results.length > 0 && (
          <StyledResults data={this.state.results} />
        )}
      </div>
    )
  }
}

const TextField = props => {
  const { autoComplete, inline, label } = props
  // const touchedThis = get(touched, name)
  // const error = get(errors, name)
  // console.log(props)

  // console.log(label, autoComplete)

  // const showError = () => {
  //   // console.log(!touched[name])
  //   // console.log(values[name])
  //   // if (name == 'author.email') console.log(error)

  //   if (touchedThis && error) return true
  //   if (!touchedThis && value && error) return true
  //   return false
  // }

  // const validationStatus = () => {
  //   if (showError()) return 'error'
  //   return 'default'
  // }

  return (
    <Wrapper autoComplete={autoComplete} inline={inline}>
      {inline && <Label>{label}</Label>}
      {/* <StyledTextField
        label={inline ? null : label}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        validationStatus={validationStatus()}
        value={value}
        {...props}
      /> */}
      {autoComplete ? <AutoComp {...props} /> : <Field {...props} />}
      {/* {showError() && <Error>{error}</Error>} */}
    </Wrapper>
  )
}

export default TextField
