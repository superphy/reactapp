import React, { PureComponent } from 'react';
// react-md
import FileInput from 'react-md/lib/FileInputs';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import Subheader from 'react-md/lib/Subheaders';
// redux
import { connect } from 'react-redux'
import { addJob } from '../actions'
// axios
import axios from 'axios'
import { API_ROOT } from '../middleware/api'
import Loading from '../components/Loading'
import { RedirectToken } from '../components/RedirectToken'

class Metadata extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      submitted: false,
      jobId: "",
      hasResult: false,
      bulk: false,
      progress: 0,
      uploading: false
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
    // create form data with files
    var data = new FormData()
    data.append('file', this.state.file)
    // POST
    axios.post(API_ROOT + 'uploadmetadata', data, createConfig(this._updateUploadProgress))
      .then(response => {
        console.log(response)
        // no longer uploading
        this.setState({
          uploading: false
        })
        let job = response.data
        // handle the return
        // console.log(job)
        // console.log(jobs[job].analysis)
        // check filename
        let f = this.state.file.name
        const jobId = job
        this.setState({jobId})
        this.props.dispatch(addJob(job,
          "metadata",
          new Date().toLocaleTimeString(),
          String('Metadata Upload: ' + f )
        ))
        const hasResult = true
        this.setState({hasResult})
      })
  };
  render(){
    const { file, uploading, hasResult, progress } = this.state
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
                defaultValue="Example of Metadata Sheet:"
              />
                <a href='https://raw.githubusercontent.com/superphy/backend/master/app/static/example_metadata.xlsx' download='example_metadata.xlsx'>Download</a>
              <TextField
                id="title"
                defaultValue="File Submission:"
              />
              <Subheader primaryText="(Note: Please submit the Subtyping tasks and wait for them to complete first.)" inset />
              <FileInput
                id="inputFile"
                secondary
                label="Select Metadata File"
                onChange={this._selectFile}
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
              {this.state.file ?
                <TextField
                  key={this.state.file.name}
                  defaultValue={this.state.file.name}
                />: ''}
            </div>
          </form>:(!uploading?
            <Loading jobId={this.state.jobId} />
            :""
          )

        }
      </div>
    )
  }
}

Metadata = connect()(Metadata)

export default Metadata
