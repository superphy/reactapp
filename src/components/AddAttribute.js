import React, { Component } from 'react';
import PropTypes from 'prop-types'
import SelectField from 'react-md/lib/SelectFields';
import Radio from 'react-md/lib/SelectionControls/Radio';
import Switch from 'react-md/lib/SelectionControls/Switch';
import axios from 'axios'
import { API_ROOT } from '../middleware/api';

class AddAttribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: [],
      o_attributes: {}
    };
    this.setRelation = this.setRelation.bind(this);
    this.setAttribute = this.setAttribute.bind(this);
    this._handleInlineChange = this._handleInlineChange.bind(this);
  }
  setRelation(newValue, newActiveIndex, event) {
    console.log(newValue, newActiveIndex, event);
    const relation = this.props.o_relations[newValue];

    // With the relation type chosen, we can query the backend
    console.log(relation)
    // Display a CircularProgress for querying.
    this.props.setQuerying(true);
    // Query.
    axios.get(API_ROOT + `get_attribute_values/type/` + relation)
      .then(res => {
        const o_attributes = res.data;
        const attributes = Object.keys(o_attributes).sort();
        this.setState({ attributes, o_attributes });
        // Stop the CircularProgress.
        this.props.setQuerying(false);
    });
    // Callback to set state in upper level.
    this.props.handleChange(relation, event, this.props.groupIndex, this.props.attributeIndex, "relation");
  }
  setAttribute(newValue, newActiveIndex, event) {
    console.log(newValue, newActiveIndex, event);
    const attribute = this.state.o_attributes[newValue];

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
            <div className="md-grid">
              <SelectField
                id="relations"
                label="Node/Attribute Type"
                placeholder="Select a node/attribute type"
                position={SelectField.Positions.BELOW}
                menuItems={this.props.relations}
                className="md-cell"
                helpOnFocus
                helpText="Classes of nodes/attributes."
                onChange={this.setRelation}
                required
              />
              <SelectField
                id="attributes"
                label="Value"
                placeholder="Select a specific value for the type"
                position={SelectField.Positions.BELOW}
                menuItems={this.state.attributes}
                className="md-cell"
                helpOnFocus
                helpText="A specific instance of a node/attribute type. For example, O157 is an instance of O-Type."
                onChange={this.setAttribute}
                required
              />
            </div>
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
      </section>
    )
  }
}

AddAttribute.propTypes = {
  handleChange: PropTypes.func,
  numberAttributes: PropTypes.number
}

export default AddAttribute;
