import React, { PureComponent } from 'react';
// react-md
import FileInput from 'react-md/lib/FileInputs';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
// redux
import { connect } from 'react-redux'
import { addJob } from '../actions'
import { panseqDescription } from '../middleware/panseq'

// axios
import axios from 'axios'
import { API_ROOT } from '../middleware/api'
// router
import { Redirect } from 'react-router'
import Loading from '../components/Loading'
import { RedirectToken } from '../components/RedirectToken'
// redirects
import { RESULTS } from '../Routes'

class Panseq extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      submitted: false,
      open: false,
      pan: true,
      msg: '',
      jobId: "",
      hasResult: false,
      progress: 0
    }
  }
  _selectFile = (file) => {
    console.log(file)
    if (!file) { return; }
    this.setState({ file });
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
    // create form data with files```
    var data = new FormData()
    // eslint-disable-next-line
    this.state.file.map((f) => {
      data.append('file', f)
    })
    // append options
    // to match spfy(angular)'s format, we dont use a dict
    data.append('options.pi', this.state.pi)



    // POST
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
          // console.log(jobs[job].analysis)
          // check filename
          let f = (this.state.file.length > 1 ?
          String(this.state.file.length + ' Files')
          :this.state.file[0].name)



            // regular subtyping uplods
            if((jobs[job].analysis === "Panseq") && (jobs[job].file.includes('Results'))){
              this.props.dispatch(addJob(job,
              'Panseq',
              new Date().toLocaleString(),
              panseqDescription(f, this.state.pi, this.state.pan)
              ))
              }

        }
        const hasResult = true
        this.setState({hasResult})
      })
  };
  render(){
    const { file, groupresults, uploading, hasResult, progress } = this.state
    const { token } = this.props;
    return (
      <div>
        <RedirectToken token={token} />
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
              <TextField
                id="title"
                defaultValue="Upload Genome Files for Panseq Run"
              />
              <p>
                Note: An initial upload of more than one
                genome files is required. Afterwards, the stored pan-genome
                will be updated with any additional files submitted.
              </p>
              <p>
                Ref: Pan-genome sequence analysis using Panseq: an online tool for the rapid analysis of core and accessory genomic regions. Laing, Chad, et al. https://www.ncbi.nlm.nih.gov/pubmed/20843356
              </p>
              <FileInput
                id="inputFile"
                secondary
                label="Select File(s)"
                onChange={this._selectFile}
                multiple
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
            <Redirect to={RESULTS} />:
            <Loading jobId={this.state.jobId} />
          ):"")

        }
      </div>
    )
  }
}

Panseq = connect()(Panseq)

export default Panseq
