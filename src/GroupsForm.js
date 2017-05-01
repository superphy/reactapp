import React, { PureComponent } from 'react';
import Paper from 'react-md/lib/Papers';
import Group from './Group';
// Temporary to display fields in class Group
import {groups, attributes} from './constants';

export default class GroupsForm extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    alert('A name was submitted: ');
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="paper-container">
          <Paper>
              <Group groups={groups} attributes={attributes}></Group>
          </Paper>
          <Paper>
              <Group groups={groups} attributes={attributes}></Group>
          </Paper>
        </div>
      </form>
    );
  }
}
