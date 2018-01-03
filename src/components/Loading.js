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
// msg defaults
import { createErrorMessage } from '../middleware/api'
// redirects
import { RESULTS } from '../Routes'

class Loading extends Component {
  render() {
    const { results } = this.props
    if (results.pending){
      // this means flask is doing something and hasnt responded yet
      return <div>Waiting for server response...<CircularProgress key="progress" id='contentLoadingProgress' /></div>
    } else if (results.rejected){
      // this means flask rejected it
      return createErrorMessage(this.props.jobId, 'Upload was rejected by the server.')
    } else if (results.fulfilled){
      console.log(results)
      // then flask responded with a string
      // in which case, the job either failed of is still pending
      // actual results are in the form of an array
      if (typeof(results.value) === 'string'){
        if (results.value === "pending"){
          return (
            <div>
                <LinearProgress key="progress" id='contentLoadingProgress' />
                <p>
                  Server is crunching away...
                </p>
                <p>
                  You can go to "Tasks" to submit new jobs and simply return
                  afterwards by going to "Results". Just leave the website itself
                  open.
                </p>
            </div>
          )
        } else {
            // some error message was received
            return (
              <div>
                {createErrorMessage(this.props.jobId, results.value)}
              </div>
            )
          }
        } else {
        return (
          <Redirect to={RESULTS + '/' + this.props.jobId} />
        );
      }
    }
  }
}

export default connect(props => ({
  results: {url: API_ROOT + `results/${props.jobId}`, refreshInterval: 5000 }
}))(Loading)
