// a generic loading object to check status of currently submitted job
// redirects to corresponding results page when done

import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { connect } from 'react-refetch'
// progress bar
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';
// requests
import { API_ROOT } from '../middleware/api'

class Loading extends Component {
  render() {
    const { results } = this.props
    if (results.pending){
      return <div>Waiting for server response...<CircularProgress key="progress" id='contentLoadingProgress' /></div>
    } else if (results.rejected){
      return <div>Couldn't retrieve job: {this.props.jobId}</div>
    } else if (results.fulfilled){
      console.log(results)
      if (results.value){
        return (
          <Redirect to={'/results/' + this.props.jobId} />
        );
      } else {
        return (
          <div>Server is crunching away...
              <LinearProgress key="progress" id='contentLoadingProgress' />
          </div>
        )
      }
    }
  }
}

export default connect(props => ({
  results: {url: API_ROOT + `results/${props.jobId}`, refreshInterval: 5000 }
}))(Loading)
