import React, { PureComponent } from 'react';
// react-md
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons';
// redux
import { connect } from 'react-redux'
import { addJob } from '../actions'
// axios
import axios from 'axios'
import { API_ROOT } from '../middleware/api'
// router
import Loading from '../components/Loading'

class Database extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      jobId: "",
      hasResult: false
    }
  }
  _handleSubmit = (e) => {
    e.preventDefault() // disable default HTML form behavior
    // open and msg are for Snackbar
    // uploading is to notify users
    this.setState({
      jobId: '',
      uploading: true
    });
    // create form data with files
    var data = new FormData()
    // post
    axios.post(API_ROOT + 'newdatabasestatus', data)
      .then(response => {
        console.log(response)
        // no longer uploading
        this.setState({
          uploading: false
        })
        let jobId = response.data
        this.setState({jobId})
        // handle the return
        this.props.dispatch(addJob(jobId,
          'database',
          new Date().toLocaleTimeString(),
          String('Status as of: ' + new Date().toLocaleTimeString())
        ))
        const hasResult = true
        this.setState({hasResult})
      })
  };
  render(){
    const { hasResult } = this.state
    return (
      <div>
        {/* actual form */}
        {(!hasResult)?
          <form className="md-text-container md-grid">
            <div className="md-cell md-cell--12">
              <TextField
                key="descrip"
                defaultValue="Note: Response can be quite large."
              />
              <Button
                raised
                secondary
                type="submit"
                label="Submit"
                onClick={this._handleSubmit}
              />
            </div>
          </form> :
          <Loading jobId={this.state.jobId} />
        }
      </div>
    )
  }
}

Database = connect()(Database)

export default Database
