import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import Job from '../components/Job'
import { RedirectToken } from '../components/RedirectToken'

class Results extends Component {
  render(){
    const { jobs } = this.props;
    return (
      <div>
        <RedirectToken token={this.props.token} />
        {jobs.map(job =>
          <Job
            key={job.id}
            {...job}
          />
        )}
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

Results = withRouter(connect(
  mapStateToProps
)(Results))

export default Results
