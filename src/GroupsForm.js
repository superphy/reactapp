import React, { PureComponent } from 'react';
import Paper from 'react-md/lib/Papers';
import Group from './Group';
// Temporary to display fields in class Group
import attributes from './constants';
// axios is a http client lib
import axios from 'axios'

export default class GroupsForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    alert('A name was submitted: ');
    event.preventDefault();
  }
  componentDidMount() {
    axios.get(`http://10.139.14.156:8000/api/v0/get_all_attribute_types`)
      .then(res => {
        const groups = res.data.data.children.map(obj => obj.data);
        this.setState({ groups });
        console.log(groups)
      });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="paper-container">
          <Paper>
              <Group groups={this.state.groups} attributes={attributes}></Group>
          </Paper>
          <Paper>
              <Group groups={this.state.groups} attributes={attributes}></Group>
          </Paper>
        </div>
      </form>
    );
  }
}
