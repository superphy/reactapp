import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import SelectField from 'react-md/lib/SelectFields';
import Divider from 'react-md/lib/Dividers';
import axios from 'axios'

class AddAttribute extends PureComponent {
  constructor(props) {
    super(props);
    // Note: the state of this component is not considered 'fixed' until it is submitted to the redux store
    this.state = {
      relation: '',
      attribute: ''
    };
    this.setRelation = this.setRelation.bind(this);
    this.setAttribute = this.setAttribute.bind(this);
  }
  setRelation(newValue, newActiveIndex, event) {
    console.log(newValue, newActiveIndex, event);
    const relation = newValue;
    this.setState({ relation })
    // With the relation type set, we can query the backend

  }
  setAttribute(newValue, newActiveIndex, event) {
    console.log(newValue, newActiveIndex, event);
    const attribute = newValue;
    this.setState({ attribute })
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
          onChange={this.setRelation}
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
          onChange={this.setAttribute}
        />
        <Divider />
      </section>
    )
  }
}

export default AddAttribute;
