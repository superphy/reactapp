import React, { Component } from 'react';
import { addJob } from '../actions'
// react-router
import { Link } from 'react-router-dom';
// react-md
import {
  Button
} from 'react-md';
// axios
import axios from 'axios'
import { API_ROOT, saveStore, fetchStore } from '../middleware/api'
// redux
import { connect } from 'react-redux'
// links
import { LOGIN, LOGOUT } from '../routes'

class Accounts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dbResponse: '',
      dbAuthResponse: '',
      response: ''
    };
  }

  getDbResponse() {
    const url = `${API_ROOT}ping`;
    axios.get(url)
      .then(response => {
        // console.log(response);
        this.setState({dbResponse: response.data})
        return response.data
      })
      .catch(error => {
        console.log(error);
        return error
      });
  }
  getDbAuthResponse() {
    const url = `${API_ROOT}secured/ping`;
    // console.log('Accounts sees')
    // console.log(this.props.auth.getAccessToken())
    axios.get(url, { headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }})
      .then(response => {
        console.log(response);
        this.setState({dbAuthResponse: response.data})
        return response.data
      })
      .catch(error => {
        console.log(error);
        return error
      });
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
  _handleFetch(access_token){
    console.log('fetching...')
    let promise = fetchStore(access_token)
    promise.then((response) => {
      console.log('fetch response: ', response)
      console.log('jobs:')
      for (let i in response){
        console.log('i', i)
        let job = response[i]
        console.log(response[i])
        this.props.dispatch(addJob(
          job.hash,
          job.analysis,
          job.date,
          job.description
        ))
      }
    })
  }
  // _handleSync(jobs, access_token){
  //   let jobs_exist = (jobs.length !== 0)
  //   console.log('jobs_length', jobs.length)
  //   console.log('jobs_exist: ', jobs_exist)
  //   if (!jobs_exist){
  //     console.log('no jobs detected, fetching...')
  //     this._handleFetch(access_token)
  //   } else {
  //     console.log('job(s) detecetd, bypassing sync')
  //   }
  // }
  componentDidMount() {
    if (this.props.auth.isAuthenticated()){
      // console.log('accessToken')
      // console.log(this.props.auth.getAccessToken())
      this.getDbResponse()
      this.getDbAuthResponse()
      if (this.props !== null){
        console.log('not null')
        if (this.props.jobs.length === 0){
          this._handleFetch(this.props.auth.getAccessToken())
        }
      }
    }
  }
  render(){
    const { isAuthenticated } = this.props.auth;
    const { dbResponse, dbAuthResponse, response } = this.state;
    const { jobs } = this.props;
    // console.log('Accounts')
    // console.log(this.props.auth)
    // console.log(isAuthenticated())
    console.log('Store')
    console.log(jobs)
    return (
      <div className="md-text-container md-grid">
        <div className="md-cell md-cell--12">
          {!isAuthenticated()?
            <Link to={LOGIN}>
              <Button flat primary label="Login / Register">input</Button>
            </Link>
            :<div>
              {/* {this._handleSync(jobs, this.props.auth.getAccessToken())} */}
              <p>Database Connection: {dbResponse}</p>
              <p>Authentication Status: {dbAuthResponse}</p>
              <p>Backup Status: {response}</p>
              <Button flat primary onClick={() => this._handleBackup(jobs, this.props.auth.getAccessToken())} label="Backup Results">cloud_upload</Button>
              {/* <Button flat primary onClick={() => this._handleFetch(this.props.auth.getAccessToken())} label="Fetch Backup">cloud_download</Button> */}
              <Link to={LOGOUT}>
                <Button flat primary label="Logout">input</Button>
              </Link>
            </div>
          }
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
