import React, { PureComponent } from 'react';
// react-md
import FileInput from 'react-md/lib/FileInputs';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox'
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons';
// redux
import { connect } from 'react-redux'
import { addJob } from '../actions'
// axios
import axios from 'axios'
import { API_ROOT } from '../middleware/api'

class Subtyping extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      pi: 90,
      amr: true,
      serotype: true,
      vf: true,
      open: false
    }
  }
  _selectFile = (file) => {
    console.log(file)
    if (!file) { return; }
    this.setState({ file });
  }
  _updatePi = (value) => {
    this.setState({ pi: value });
  }
  _updateSerotype = (value) => {
    this.setState({ serotype: value })
  }
  _updateAmr = (value) => {
    this.setState({ amr: value })
  }
  _updateVf = (value) => {
    this.setState({ vf: value })
  }
  _handleSubmit = (e) => {
    e.preventDefault()
  };
  render(){
    const { file, pi, amr, serotype, vf } = this.state
    return (
      <form className="md-text-container md-grid">
        <div className="md-cell md-cell--12">
          <FileInput
            id="inputFile"
            secondary
            label="Select File(s)"
            onChange={this._selectFile}
            multiple
          />
          <Checkbox
            id="serotype"
            name="check serotype"
            checked={serotype}
            onChange={this._updateSerotype}
            label="Serotype"
          />
          <Checkbox
            id="vf"
            name="check vf"
            checked={vf}
            onChange={this._updateVf}
            label="Virulence Factors"
          />
          <Checkbox
            id="amr"
            name="check amr"
            checked={amr}
            onChange={this._updateAmr}
            label="Antimicrobial Resistance"
          />
          <TextField
            id="pi"
            value={pi}
            onChange={this._updatePi}
            helpText="Percent Identity for BLAST"
          />
          <Button
            raised
            secondary
            type="submit"
            label="Submit"
            disabled={!file}
            onClick={this._handleSubmit}
          />
        </div>
      </form>
    )
  }
}

Subtyping = connect()(Subtyping)

export default Subtyping
