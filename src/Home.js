import React, { PureComponent } from 'react';
import GroupsForm from './GroupsForm'

export default class Home extends PureComponent {
  render() {
    return (
      <div className="md-grid">
        <GroupsForm />
      </div>
    );
  }
}
