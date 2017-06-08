import React, { PropTypes } from 'react'
import Job from './Job'

const JobsList = ({ jobs, onJobClick }) => (
  <ul>
    {jobs.map(job =>
      <Job
        key={job.id}
        {...job}
        onClick={onJobClick}
      />
    )}
  </ul>
)

JobsList.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    hash: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onJobClick: PropTypes.func.isRequired
}

export default JobsList
