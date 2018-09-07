/* eslint-disable react/prop-types */

import React from 'react'
import { Query, Mutation } from 'react-apollo'
import styled from 'styled-components'
import { Form, Formik } from 'formik'
import { keys, sortBy } from 'lodash'

import { Button, H2, H4 } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import { Select } from './ui'
import UPDATE_TEAM from '../mutations/updateTeam'
import GET_TEAMS from '../queries/getTeams'
import GET_USERS from '../queries/getUsers'

import Loading from './Loading'

const TeamHeadingWrapper = styled(H4)`
  font-size: ${th('fontSizeHeading4')};
  line-height: ${th('lineHeightHeading3')};
  margin: 0 auto ${th('gridUnit')};
`

const TeamSectionWrapper = styled.div`
  padding: calc(${th('gridUnit')} * 2) 0;
`

const Ribbon = styled.div`
  background: ${th('colorSuccess')};
  border-radius: 3px;
  color: ${th('colorTextReverse')};
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  margin-top: ${th('gridUnit')};
  padding: calc(${th('gridUnit')} / 2) 0;
  text-align: center;
  visibility: ${props => (props.hide ? 'hidden' : 'visible')};
  width: 60%;
`

const ButtonWrapper = styled.div`
  padding: calc(${th('gridUnit')} * 2) 0;
`

const PageHeading = styled(H2)`
  margin: 0;
  padding: 0 calc(${th('gridUnit')} * 2);
`

const PageWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  form {
    width: 60%;
  }
`

const TeamHeading = props => {
  const { name } = props
  return <TeamHeadingWrapper>{name}</TeamHeadingWrapper>
}

const TeamSection = props => {
  const { name, setFieldValue, type, users, value } = props

  const options = users
    ? users.map(user => ({
        label: user.username,
        value: user.id,
      }))
    : []

  const selectValue = value.map(user => {
    if (!user.label && !user.value)
      return {
        label: user.username,
        value: user.id,
      }
    return user
  })

  const handleChange = newValue => {
    setFieldValue(type, newValue)
  }

  return (
    <TeamSectionWrapper>
      <TeamHeading name={name} />
      <Select
        closeMenuOnSelect={false}
        isMulti
        name={type}
        onChange={handleChange}
        options={options}
        value={selectValue}
      />
    </TeamSectionWrapper>
  )
}

const TeamManagerForm = props => {
  const { setFieldValue, teams, users, values } = props

  return (
    <Form>
      {teams.map(team => (
        <TeamSection
          key={team.id}
          name={team.name}
          setFieldValue={setFieldValue}
          type={team.teamType}
          users={users}
          value={values[team.teamType]}
        />
      ))}

      <ButtonWrapper>
        <Button disabled={!props.dirty} primary type="submit">
          Save
        </Button>
      </ButtonWrapper>
    </Form>
  )
}

class TeamManager extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hideRibbon: true,
    }
  }

  handleSubmit = (formValues, formikBag) => {
    const { updateTeam, teams } = this.props

    const data = keys(formValues).map(teamType => ({
      id: teams.find(t => t.teamType === teamType).id,
      members: formValues[teamType].map(item => {
        if (item.id) return item.id
        return item.value
      }),
    }))

    const promises = data.map(team =>
      updateTeam({
        variables: {
          id: team.id,
          input: { members: team.members },
        },
      }),
    )

    Promise.all(promises).then(res => {
      this.showRibbon()
      formikBag.resetForm(formValues)
    })
  }

  // TODO -- handle better cases like many quick saves
  showRibbon = () => {
    this.setState({
      hideRibbon: false,
    })

    setTimeout(
      () =>
        this.setState({
          hideRibbon: true,
        }),
      4000,
    )
  }

  render() {
    const { users, loading, teams } = this.props
    const { hideRibbon } = this.state

    if (loading) return <Loading />

    let globalTeams = teams.filter(team => team.global)
    const infoMessage = 'Your teams have been successfully updated'

    const initialValues = {}
    globalTeams.forEach(team => {
      initialValues[team.teamType] = team.members
    })

    globalTeams = sortBy(globalTeams, 'name')

    return (
      <PageWrapper>
        <PageHeading>Team Manager</PageHeading>
        <Ribbon hide={hideRibbon}>{infoMessage}</Ribbon>

        <Formik
          initialValues={initialValues}
          onSubmit={this.handleSubmit}
          render={formikProps => (
            <TeamManagerForm
              teams={globalTeams}
              users={users}
              {...formikProps}
            />
          )}
        />
      </PageWrapper>
    )
  }
}

export default () => (
  <Mutation mutation={UPDATE_TEAM} refetchQueries={[{ query: GET_TEAMS }]}>
    {updateTeam => (
      <Query query={GET_TEAMS}>
        {({ data: { teams }, loading }) => (
          <Query query={GET_USERS}>
            {({ data: { users } }) => (
              <TeamManager
                loading={loading}
                teams={teams}
                updateTeam={updateTeam}
                users={users}
              />
            )}
          </Query>
        )}
      </Query>
    )}
  </Mutation>
)
