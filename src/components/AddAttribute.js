import React, { Component } from 'react';
import PropTypes from 'prop-types'
import SelectField from 'react-md/lib/SelectFields';
import Radio from 'react-md/lib/SelectionControls/Radio';
import Divider from 'react-md/lib/Dividers';
import axios from 'axios'
import { API_ROOT } from '../middleware/api';

class AddAttribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relation: '',
      attribute: '',
      attributes: []
    };
    this.setRelation = this.setRelation.bind(this);
    this.setAttribute = this.setAttribute.bind(this);
    this._handleInlineChange = this._handleInlineChange.bind(this);
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
  _handleInlineChange(e) {
   // Basically how the `SelectionControlGroup` works
   this.setState({ inlineValue: e.target.value });
 }
  render(){
    const { inlineValue } = this.state;
    return (
      <section className="md-grid">
        <fieldset onChange={this._handleInlineChange}>
          <legend className="md-subheading-1">Select Attribute:</legend>
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
        </fieldset>
        <fieldset onChange={this._handleInlineChange}>
          <legend className="md-subheading-1">Link Attributes:</legend>
          <Radio
            id="inlineRadio1"
            inline
            name="inlineRadios"
            value="A"
            label="AND"
            checked={inlineValue === 'A'}
          />
          <Radio
            id="inlineRadio2"
            inline
            name="inlineRadios"
            value="B"
            label="OR"
            checked={inlineValue === 'B'}
          />
        </fieldset>
        <Divider />
      </section>
    )
  }
}

export default AddAttribute;
