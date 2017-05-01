import React, { PureComponent } from 'react';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields';
import SelectField from 'react-md/lib/SelectFields';


export default class Group extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div>
        <SelectField
          id="groups"
          label="Groups"
          placeholder="Select a Group"
          menuItems={this.props.groups}
          itemLabel="name"
          itemValue="abbreviation"
          className="md-cell"
          helpOnFocus
          helpText="Select some group for me"
        />
        <TextField
          id="eventEmail"
          placeholder="Email"
          defaultValue="heyfromjonathan@gmail.com"
          block
          paddedBlock
        />
        <Divider />
        <TextField
          id="eventName"
          placeholder="Event name"
          block
          paddedBlock
        />
        <Divider />
        <TextField
          id="eventDescription"
          placeholder="Description"
          block
          paddedBlock
          rows={4}
          defaultValue="asdlafkjewflaksejflakjskl"
        />
      </div>
    );
  }
}
Group.propTypes = {

};
Group.defaultProps = {

};
