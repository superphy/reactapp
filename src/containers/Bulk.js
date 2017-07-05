import React, { PureComponent } from 'react';
// redux
import { connect } from 'react-redux'
import { addJob } from '../actions'
// axios
import axios from 'axios'
import { API_ROOT } from '../middleware/api'
// router
import Loading from '../components/Loading'

class Bulk extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      jobId: "",
      hasResult: false
    }
  }
  componentDidMount() {
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
          new Date().toLocaleTimeString(),
          String('Database status as of: ' + new Date().toLocaleTimeString())
        ))
        const hasResult = true
        this.setState({hasResult})
      })
  }
  render(){
    const { hasResult } = this.state
    return (
      <div>
        {/* actual form */}
        {(!hasResult)?
          <div>
            Submitting request to display database status...
          </div> :
          <Loading jobId={this.state.jobId} />
        }
      </div>
    )
  }
}

Bulk = connect()(Bulk)

export default Bulk
