import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import SelectField from 'react-md/lib/SelectFields';
import Divider from 'react-md/lib/Dividers';

class AddAttribute extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      group: '',
      attribute: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  render(){
    return (
      <section className="md-grid">
        <SelectField
          id="groups"
          label="Groups"
          placeholder="Select a Group"
          position={SelectField.Positions.BELOW}
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
          position={SelectField.Positions.BELOW}
          menuItems={this.props.attributes}
          itemLabel="name"
          itemValue="abbreviation"
          className="md-cell"
          helpOnFocus
          helpText="Select some attribute for me"
        />
        <Divider />
      </section>
    )
  }
}

export default AddAttribute;
