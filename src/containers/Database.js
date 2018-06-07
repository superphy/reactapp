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
import { RedirectToken } from '../components/RedirectToken'

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
    // create form data with files
    var data = new FormData()
    // post
    axios.post(API_ROOT + 'newdatabasestatus', data)
      .then(response => {
        console.log(response)
        let jobId = response.data
        this.setState({jobId})
        // handle the return
        this.props.dispatch(addJob(jobId,
          'database',
          new Date().toLocaleString(),
          String('Database status as of: ' + new Date().toLocaleString())
        ))
        const hasResult = true
        this.setState({hasResult})
      })
  };
  render(){
    const { hasResult } = this.state;
    const { token } = this.props;
    return (
      <div>
        <RedirectToken token={token} />
        {/* actual form */}
        {(!hasResult)?
          <form className="md-text-container md-grid">
            <div className="md-cell md-cell--12">
              <TextField
                id="title"
                defaultValue="Check Database Status"
              />
              <TextField
                key="descrip"
                defaultValue="Note: This might take a bit."
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
