import React, { PureComponent } from 'react';
import update from 'immutability-helper';
import Paper from 'react-md/lib/Papers';
import Button from 'react-md/lib/Buttons/Button';
import Group from '../components/Group';
// axios is a http client lib
import axios from 'axios'
import { API_ROOT } from '../middleware/api';

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
  relations:[] // a list of possible relations from spfy
}

class GroupsForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    alert('A name was submitted: ');
    console.log(this.state)
    event.preventDefault();
  }
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
  componentDidMount() {
    axios.get(API_ROOT + `get_all_attribute_types`)
      .then(res => {
        const relations = res.data;
        this.setState({ relations });
      });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="paper-container">
          {this.state.groups.map((group, index) =>
            <Paper key={index}>
                <Group groupIndex={index} relations={this.state.relations}  handleChange={this.handleChange}></Group>
            </Paper>
          )}
          <Button raised label="Submit" onClick={this.handleSubmit}/>
        </div>
      </form>
    );
  }
}

export default GroupsForm;
