import React, { Component } from 'react'

// Uses the hash key in route to retrieve job data from Redux store
// Then decides which ResultsTemplate to render based on 'analysis'
//
// const getJob = (jobs, hash) => {
//   return jobs.filter(job => job.hash === hash)
// }
//
// const mapStateToProps = (state, ownProps) => {
//   return {
//     job: getJob(state.jobs, ownProps.hash)
//   }
// }

class ResultsTemplates extends Component {
  render (){
    return (
      <p>'cats'</p>
    )
  }
}

export default ResultsTemplates
