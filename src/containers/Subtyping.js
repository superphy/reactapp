import React, { PureComponent } from 'react';
// react-md
import FileInput from 'react-md/lib/FileInputs';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox'
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons';
import Switch from 'react-md/lib/SelectionControls/Switch';
import Subheader from 'react-md/lib/Subheaders';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
// redux
import { connect } from 'react-redux'
import { addJob } from '../actions'
import { subtypingDescription } from '../middleware/subtyping'
// axios
import axios from 'axios'
import { API_ROOT } from '../middleware/api'
// router
import { Redirect } from 'react-router'
import Loading from '../components/Loading'
import { panseqDescription } from '../middleware/panseq'


class Subtyping extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      pi: 90,
      amr: false,
      serotype: true,
      vf: true,
      submitted: false,
      open: false,
      msg: '',
      jobId: "",
      hasResult: false,
      groupresults: true,
      bulk: false,
      pan: true,
      progress: 0
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
  _updateBulk = (bulk) => {
    this.setState({ bulk })
    // if using bulk uploading, we use the `blob` id feature of superphy/backend
    // to poll for completion of all jobs
    if(bulk){
      this.setState({ groupresults:true })
    }
  }
  _updateUploadProgress = ( progress ) => {
    this.setState({progress})
  }
  _handleSubmit = (e) => {
    e.preventDefault() // disable default HTML form behavior
    // open and msg are for Snackbar
    // uploading is to notify users
    this.setState({
      uploading: true
    });
    // configure a progress for axios
    const createConfig = (_updateUploadProgress) => {
      var config = {
        onUploadProgress: function(progressEvent) {
          var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
          _updateUploadProgress(percentCompleted)
        }
      }
      return config
    }
    // create form data with files
    var data = new FormData()
    // eslint-disable-next-line
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
    // new option added in 4.3.3, use bulk uploading where results are only
    // stored and not returned (ie. don't run beautify.py on server-side)
    data.append('options.bulk', this.state.bulk)
    data.append('options.pan', this.state.pan)
    // POST
    axios.post(API_ROOT + 'upload', data, createConfig(this._updateUploadProgress))
      .then(response => {
        console.log(response)
        // no longer uploading
        this.setState({
          uploading: false
        })
        let jobs = response.data
        // handle the return
        for(let job in jobs){
          // console.log(job)
          // console.log(jobs[job].analysis)-
          // check filename
          let f = (this.state.file.length > 1 ?
          String(this.state.file.length + ' Files')
          :this.state.file[0].name)

          // for bulk uploading
          if(this.state.bulk){
            const jobId = job
            this.setState({jobId})
            this.props.dispatch(addJob(job,
              "bulk",
              new Date().toLocaleTimeString(),
              subtypingDescription(
                'Bulk Upload: ' + f , this.state.pi, this.state.serotype, this.state.vf, this.state.amr, this.state.pan)
            ))
          } else {
            // regular subtyping uplods
            if(jobs[job].analysis === "Antimicrobial Resistance"){
              this.props.dispatch(addJob(job,
                "Antimicrobial Resistance",
                new Date().toLocaleTimeString(),
                subtypingDescription(f, this.state.pi, false, false, this.state.amr, this.state.pan)
              ))
            } else if (jobs[job].analysis === "Virulence Factors and Serotype") {
              let descrip = ''
              if (this.state.vf && this.state.serotype){descrip = "Virulence Factors and Serotype"}
              else if (this.state.vf && !this.state.serotype) {descrip = "Virulence Factors"}
              else if (!this.state.vf && this.state.serotype) {descrip = "Serotype"}
              this.props.dispatch(addJob(job,
                descrip,
                new Date().toLocaleTimeString(),
                subtypingDescription(f, this.state.pi, this.state.serotype, this.state.vf, false, this.state.pan)
              ))
            } else if (jobs[job].analysis === "Subtyping") {
              // set the jobId state so we can use Loading
              const jobId = job
              this.setState({jobId})
              // dispatch
              this.props.dispatch(addJob(job,
                "Subtyping",
                new Date().toLocaleTimeString(),
                subtypingDescription(
                  f , this.state.pi, this.state.serotype, this.state.vf, this.state.amr, this.state.pan)
              ))
            }
              // end of ifelse for non-bulk uploads
          }
        }
        const hasResult = true
        this.setState({hasResult})
      })
      axios.post(API_ROOT + 'panseq', data, createConfig(this._updateUploadProgress))
      .then(response => {
        console.log(response)
        // no longer uploading
        this.setState({
          uploading: false
        })
        let jobs = response.data
        // handle the return
        for(let job in jobs){
          // console.log(job)s
          // console.log(jobs[job].analysis)
          // check filename
          let f = (this.state.file.length > 1 ?
          String(this.state.file.length + ' Files')
          :this.state.file[0].name)



            // regular subtyping uplods
            if(job.analysis === "Panseq"){
              this.props.dispatch(addJob(job,
              'Panseq',
              new Date().toLocaleTimeString(),
              panseqDescription(f, this.state.pi, this.state.pan)
              ))
              }

        }
        const hasResult = true
        this.setState({hasResult})
      })
  };
  render(){
    const { file, pi, amr, serotype, vf, groupresults, bulk, uploading, hasResult, progress } = this.state
    return (
      <div>
        {/* uploading bar */}
        {(uploading && !hasResult) ?
          <div>
            <CircularProgress key="progress" id="loading" value={progress} centered={false} />
            Uploading... {progress} %
          </div>
          : ""
        }
        {/* actual form */}
        {(!hasResult && !uploading)?
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
              <Switch
                id="bulk"
                name="bulk"
                label="Use bulk uploading (don't display results)"
                checked={bulk}
                onChange={this._updateBulk}
              />
              {!groupresults && !bulk ?
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
              {amr ?
                <Subheader primaryText="(Note: AMR increases run-time by several minutes per file)" inset />
              : ''}
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
          // if results are grouped, display the Loading page
          // else, results are separate and display the JobsList cards page
          (!uploading?(!groupresults?
            <Redirect to='/results' />:
            <Loading jobId={this.state.jobId} />
          ):"")
        }
      </div>
    )
  }
}

Subtyping = connect()(Subtyping)

export default Subtyping
