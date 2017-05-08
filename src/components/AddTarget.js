import React, { PureComponent } from 'react'
import SelectField from 'react-md/lib/SelectFields';
import Subheader from 'react-md/lib/Subheaders'

class AddTarget extends PureComponent {
  constructor(props) {
    super(props);
    this.setTarget = this.setTarget.bind(this);
  }
  setTarget(newValue, newActiveIndex, event){
    // callback
    this.props.handleChangeTarget(newValue)
  }
  render(){
    return (
      <div>
        <Subheader primary primaryText={"Target:"} />
        <fieldset>
          <legend className="md-subheading-1">Select a Target:</legend>
          <SelectField
            id="target"
            label="Targets"
            placeholder="Select a Target"
            position={SelectField.Positions.BELOW}
            menuItems={this.props.targets}
            className="md-cell"
            helpOnFocus
            helpText="Select a target to compare groups against."
            onChange={this.setTarget}
            required
          />
        </fieldset>
      </div>
    )
  }
}

export default AddTarget
