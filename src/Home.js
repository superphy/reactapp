import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
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
