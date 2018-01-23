import React, { Component } from 'react';
// react-md
import {
  Button
} from 'react-md';
import { saveStore } from '../middleware/accounts'
// redux
import { connect } from 'react-redux'

class Accounts extends Component {
  constructor(props){
    super(props)
    this.state = {
      response: ''
    }
  }
  _handleBackup(jobs, access_token){
    let promise = saveStore(jobs, access_token)
    promise.then((response) => {
      console.log('backup response: ', response)
      if (response === 'true'){
        this.setState({response: 'success!'})
      }
      else {
        this.setState({response: response})
      }
    })
  }
  render(){
    const { token, jobs } = this.props;
    const { response } = this.state;
    console.log('Store')
    console.log(jobs)
    return (
      <div className="md-text-container md-grid">
        <div className="md-cell md-cell--12">
          <div>
              <p>Backup Status: {response}</p>
              <Button flat primary onClick={() => this._handleBackup(jobs, token)} label="Backup Results">cloud_upload</Button>
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    jobs: state.jobs,
    ...ownProps
  }
}

Accounts = connect(
  mapStateToProps
)(Accounts)

export default Accounts
