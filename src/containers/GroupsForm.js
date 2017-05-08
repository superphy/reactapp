import React, { PureComponent } from 'react'
import update from 'immutability-helper'
import Paper from 'react-md/lib/Papers'
import Button from 'react-md/lib/Buttons/Button'
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
  targets: [],
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
    alert('Submitting: ' + JSON.stringify(this.state.groups));
    console.log(this.state)
    event.preventDefault();

    axios.post(API_ROOT + 'newgroupcomparison', this.state.groups)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
    const target = value;
    this.setState({target})
  }
  componentDidMount() {
    // get possible relations for user to build groups
    axios.get(API_ROOT + `get_all_attribute_types`)
      .then(res => {
        const relations = res.data;
        this.setState({ relations });
      });
    // get possible targets to compare groups against
    axios.get(API_ROOT + `get_all_types`)
      .then(res => {
        const targets = res.data;
        this.setState({ targets });
      });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="paper-container">
          {this.state.groups.map((group, index) =>
            <Paper key={index}>
                <Group groupIndex={index} relations={this.state.relations}  handleChange={this.handleChange}  handleChangeAddRelation={this.handleChangeAddRelation} />
            </Paper>
          )}
          <Paper>
            <AddTarget handleChangeTarget={this.handleChangeTarget} targets={this.state.targets} />
          </Paper>
          <Button raised label="Submit" onClick={this.handleSubmit}/>
        </div>
      </form>
    );
  }
}

export default GroupsForm;
