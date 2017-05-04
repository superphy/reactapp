import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import SelectField from 'react-md/lib/SelectFields';
import Divider from 'react-md/lib/Dividers';

class AddAttribute extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      relation: '',
      attribute: ''
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(newValue, newActiveIndex, event) {
    console.log(newValue, newActiveIndex, event);
  }
  render(){
    return (
      <section className="md-grid">
        <SelectField
          id="relations"
          label="Relations"
          placeholder="Select a Relation"
          position={SelectField.Positions.BELOW}
          menuItems={this.props.relations}
          className="md-cell"
          helpOnFocus
          helpText="Relations are descriptors about specific attributes."
          onChange={this.onChange}
        />
        <SelectField
          id="attributes"
          label="Attributes"
          placeholder="Select an Attribute"
          position={SelectField.Positions.BELOW}
          menuItems={this.props.attributes}
          className="md-cell"
          helpOnFocus
          helpText="An attribute is a specific instance of a relation type. For example, O157 is an attribute of relation O-Type."
          onChange={this.onChange}
        />
        <Divider />
      </section>
    )
  }
}

export default AddAttribute;
