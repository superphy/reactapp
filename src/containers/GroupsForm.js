import React, { PureComponent } from 'react'
import update from 'immutability-helper'
import {
  Paper,
  Button,
  Card,
} from 'react-md';
// reactapp's components
import { maxWidth } from '../middleware/layout'
import Group from '../components/Group'
import AddTarget from '../components/AddTarget'
// axios is a http client lib
import axios from 'axios'
import { API_ROOT } from '../middleware/api'

const initialStateRelation = {
    negated: false,
    relation: "",
    attribute: "",
    logical: null
}

const initialState = {
  groups: [
    [
      {
        negated: false,
        relation: "",
        attribute: "",
        logical: null
      }
    ],
    [
      {
        negated: false,
        relation: "",
        attribute: "",
        logical: null
      }
    ]
  ],
  relations:[], // a list of possible relations from spfy
  o_relations: [], // the object containining the 'uri': human-readable mapping
  targets: [],
  o_targets: [], // the object containining the 'uri': human-readable mapping
  target: "" // the chosen target to compare against
}

class GroupsForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeAddRelation = this.handleChangeAddRelation.bind(this);
    this.handleChangeTarget = this.handleChangeTarget.bind(this);
  }
  handleSubmit(event) {
    console.log(event)
    event.preventDefault();
    this.props.handleChangeSubmit(this.state.groups, this.state.target)
  }
  // this handles updating state for any change in form fields
  handleChange(value, event, groupIndex, attributeIndex, property) {
    console.log(value, event, groupIndex, attributeIndex, property)
    this.setState({
      groups: update(this.state.groups, {
          [groupIndex]: {
            [attributeIndex]: {
              [property]: {
                $set: value
              }
            }
          }
        }
      )
    })
  }
  handleChangeAddRelation(groupIndex) {
    this.setState({
      groups: update(this.state.groups, {
        [groupIndex]: {
          $push: [initialStateRelation]
        }
      })
    })
  }
  handleChangeTarget(value){
    const target = this.state.o_targets[value];
    this.setState({target})
  }
  componentDidMount() {
    // get possible relations for user to build groups
    axios.get(API_ROOT + `get_all_attribute_types`)
      .then(res => {
        const o_relations = res.data;
        const relations = Object.keys(res.data).sort();
        this.setState({ o_relations, relations });
      });
    // get possible targets to compare groups against
    axios.get(API_ROOT + `get_all_types`)
      .then(res => {
        const o_targets = res.data;
        const targets = Object.keys(res.data).sort();
        this.setState({ o_targets, targets });
      });
  }
  groupCard = (group, index) => (
    <Card
      key={index}
      style={{ maxWidth: maxWidth }}
    >
      {console.log(group)}
        <Group groupIndex={index} relations={this.state.relations} o_relations={this.state.o_relations} handleChange={this.handleChange}  handleChangeAddRelation={this.handleChangeAddRelation} group={group}
        numberAttributes={group.length}/>
    </Card>
  )
  render() {
    const {
      step,
      nextButton
    } = this.props;
    const {
      groups,
      targets,
    } = this.state;
    console.log(step)
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="paper-container">
          {step===2?
            this.groupCard(groups[0], 0)
          :''}
          {step===3?
            this.groupCard(groups[1], 1)
          :''}
          {step===4?
            <div>
              <Card style={{ width: maxWidth }}>
                <AddTarget handleChangeTarget={this.handleChangeTarget} targets={targets} />
              </Card>
              <Button raised secondary label="Submit" onClick={this.handleSubmit}>send</Button>
            </div>
          :''}
          {nextButton}
        </div>
      </form>
    );
  }
}

export default GroupsForm;
