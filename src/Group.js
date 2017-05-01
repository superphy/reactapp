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
