import React, { Component } from 'react';
import PropTypes from 'prop-types'
import SelectField from 'react-md/lib/SelectFields';
import Radio from 'react-md/lib/SelectionControls/Radio';
import Switch from 'react-md/lib/SelectionControls/Switch';
import Divider from 'react-md/lib/Dividers';
import axios from 'axios'
import { API_ROOT } from '../middleware/api';

class AddAttribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: [],
    };
    this.setRelation = this.setRelation.bind(this);
    this.setAttribute = this.setAttribute.bind(this);
    this._handleInlineChange = this._handleInlineChange.bind(this);
  }
  setRelation(newValue, newActiveIndex, event) {
    console.log(newValue, newActiveIndex, event);
    const relation = newValue;

    // With the relation type chosen, we can query the backend
    console.log(relation)
    axios.get(API_ROOT + `get_attribute_values/type/` + relation)
      .then(res => {
        const attributes = res.data.sort();
        this.setState({ attributes });
      });

    // callback to set state in upper level
    this.props.handleChange(relation, event, this.props.groupIndex, this.props.attributeIndex, "relation");
  }
  setAttribute(newValue, newActiveIndex, event) {
    console.log(newValue, newActiveIndex, event);
    const attribute = newValue;

    // callback to set state in upper level
    this.props.handleChange(attribute, event, this.props.groupIndex, this.props.attributeIndex, "attribute");
  }
  _handleInlineChange(e) {
   // Basically how the `SelectionControlGroup` works
   this.setState({ inlineValue: e.target.value });
   console.log(e)
   console.log(e.target.id)

   // callback
   this.props.handleChange(e.target.id, event, this.props.groupIndex, this.props.attributeIndex, "logical");
 }
 _handleChangeNegated = (negated, event) => {
    this.props.handleChange(negated, event, this.props.groupIndex, this.props.attributeIndex, "negated");
  };
  render(){
    const { inlineValue, negated } = this.state;
    return (
      <section className="md-grid">
        <fieldset style={{border: 0}}>
        <fieldset>
            <legend className="md-subheading-1">Define a relation:</legend>
            <Switch id="switch3" name="controlledSwitch" label="Negate" checked={negated} onChange={this._handleChangeNegated} />
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
          {this.props.attributeIndex < this.props.numberAttributes-1 ?
            <fieldset onChange={this._handleInlineChange}>
              <legend className="md-subheading-1">Linked By:</legend>
              <Radio
                id="OR"
                inline
                name="inlineRadios"
                value="B"
                label="OR"
                checked={inlineValue === 'B'}
              />
              <Radio
                id="AND"
                inline
                name="inlineRadios"
                value="A"
                label="AND"
                checked={inlineValue === 'A'}
              />
            </fieldset> : <div></div>
          }
        </fieldset>
          <Divider />
      </section>
    )
  }
}

AddAttribute.propTypes = {
  handleChange: PropTypes.func,
  numberAttributes: PropTypes.number
}

export default AddAttribute;
