import React, { PureComponent } from 'react';
// react-md
import FileInput from 'react-md/lib/FileInputs';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox'
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons';
import Switch from 'react-md/lib/SelectionControls/Switch';
import Subheader from 'react-md/lib/Subheaders';
// Snackbar
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// redux
import { connect } from 'react-redux'
import { addJob } from '../actions'
import { subtypingDescription } from '../middleware/subtyping'
// axios
import axios from 'axios'
import { API_ROOT } from '../middleware/api'
// router
import { Redirect } from 'react-router'

class Subtyping extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      pi: 90,
      amr: true,
      serotype: true,
      vf: true,
      open: false,
      msg: '',
      hasResult: false,
      groupresults: true
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
  _updateGroupResults = (groupresults) => {
    this.setState({ groupresults })
  }
  _handleSubmit = (e) => {
    e.preventDefault() // disable default HTML form behavior
    this.setState({
      open: true,
      msg: "Genomes were submitted"
    });
    // configure a progress for axios
    var config = {
      onUploadProgress: function(progressEvent) {
        var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
      }
    };
    // create form data with files
    var data = new FormData()
    this.state.file.map((f) => {
      data.append('file', f)
    })
    // append options
    // to match spfy(angular)'s format, we dont use a dict
    data.append('options.pi', this.state.pi)
    data.append('options.amr', this.state.amr)
    data.append('options.serotype', this.state.serotype)
    data.append('options.vf', this.state.vf)
    // new option added in 4.2.0, group all files into a single result
    // this means polling in handled server-side
    data.append('options.groupresults', this.state.groupresults)
    // put
    axios.post(API_ROOT + 'upload', data, config)
      .then(response => {
        console.log(response)
        let jobs = response.data
        for(let job in jobs){
          // console.log(job)
          // console.log(jobs[job].analysis)
          // check filename
          let f = ''
          for (let i in this.state.file){
            // recall that we incl the file path in response
            // console.log(jobs[job].file)
            // console.log(this.state.file[i])
            if(jobs[job].file.includes(this.state.file[i].name)){
              f = this.state.file[i].name
            }
          }
          if(jobs[job].analysis === "Antimicrobial Resistance"){
            this.props.dispatch(addJob(job,
              "Antimicrobial Resistance",
              new Date().toLocaleTimeString(),
              subtypingDescription(f, this.state.pi, false, false, this.state.amr)
            ))
          } else if (jobs[job].analysis === "Virulence Factors and Serotype") {
            let descrip = ''
            if (this.state.vf && this.state.serotype){descrip = "Virulence Factors and Serotype"}
            else if (this.state.vf && !this.state.serotype) {descrip = "Virulence Factors"}
            else if (!this.state.vf && this.state.serotype) {descrip = "Serotype"}
            this.props.dispatch(addJob(job,
              descrip,
              new Date().toLocaleTimeString(),
              subtypingDescription(f, this.state.pi, this.state.serotype, this.state.vf, false)
            ))
          }
        }
        const hasResult = true
        this.setState({hasResult})
      })
  };
  // Snackbar
  _handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  render(){
    const { file, pi, amr, serotype, vf, groupresults } = this.state
    return (
      <div>
        {!this.state.hasResult ?
          <form className="md-text-container md-grid">
            <div className="md-cell md-cell--12">
              <FileInput
                id="inputFile"
                secondary
                label="Select File(s)"
                onChange={this._selectFile}
                multiple
              />
              <Switch
                id="groupResults"
                name="groupResults"
                label="Group files into a single result"
                checked={groupresults}
                onChange={this._updateGroupResults}
              />
              {!groupresults ?
                <Subheader primaryText="(Will split files & subtyping methods into separate results)" inset />
              : ''}
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
            <div className="md-cell md-cell--12">
              {this.state.file ? this.state.file.map(f => (
                <TextField
                  key={f.name}
                  defaultValue={f.name}
                />
              )) : ''}
            </div>
          </form> :
          <Redirect to='/results' />
        }
        <MuiThemeProvider>
          <Snackbar
            open={this.state.open}
            message={this.state.msg}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
        </MuiThemeProvider>
      </div>
    )
  }
}

Subtyping = connect()(Subtyping)

export default Subtyping
