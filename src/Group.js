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
      <section className="md-grid">
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
        <SelectField
          id="attributes"
          label="Attributes"
          placeholder="Select an Attribute"
          menuItems={this.props.attributes}
          itemLabel="name"
          itemValue="abbreviation"
          className="md-cell"
          helpOnFocus
          helpText="Select some attribute for me"
        />
        <Divider />
      </section>
    );
  }
}
Group.propTypes = {

};
Group.defaultProps = {

};
