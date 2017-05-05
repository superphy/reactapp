import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SelectField from 'react-md/lib/SelectFields';
import Divider from 'react-md/lib/Dividers';
import axios from 'axios'
import { API_ROOT } from '../middleware/api';
import { SET_RELATION, SET_ATTRIBUTE } from '../actions/group'

class AddAttribute extends PureComponent {
  constructor(props) {
    super(props);
    // Note: the state of this component is not considered 'fixed' until it is submitted to the redux store
    this.state = {
      relation: '',
      attribute: '',
      attributes: []
    };
    this.setRelation = this.setRelation.bind(this);
    this.setAttribute = this.setAttribute.bind(this);
  }
  setRelation(newValue, newActiveIndex, event) {
    console.log(newValue, newActiveIndex, event);
    const relation = newValue;
    this.setState({ relation })
    // With the relation type chosen, we can query the backend
    console.log(relation)
    axios.get(API_ROOT + `get_attribute_values/type/` + relation)
      .then(res => {
        const attributes = res.data;
        this.setState({ attributes });
      });
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
          required
        />
        <SelectField
          id="attributes"
          label="Attributes"
          placeholder="Select an Attribute"
          position={SelectField.Positions.BELOW}
          menuItems={this.state.attributes}
          className="md-cell"
          helpOnFocus
          helpText="An attribute is a specific instance of a relation type. For example, O157 is an attribute of relation O-Type."
          onChange={this.setAttribute}
          required
        />
        <Divider />
      </section>
    )
  }
}

export default AddAttribute;
