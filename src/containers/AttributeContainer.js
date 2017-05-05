import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Paper from 'react-md/lib/Papers';
import Button from 'react-md/lib/Buttons/Button';
import { setRelation } from '../actions'
import Group from '../components/Group'

const AttributeContainer = ({ relations, groups, setRelation }) => (
  <form>
    {groups.map(group =>
      <Paper>
        <Group
          key={group.id}
          relations={relations}
          setRelation={setRelation} />
      </Paper>
      <Button raised label="Submit" />
    )}
  </form>
)

const mapStateToProps = state => ({
  groups: getGroups(state.groups)
})

export default connect(
  mapStateToProps,
  { setRelation }
)(AttributeContainer)
