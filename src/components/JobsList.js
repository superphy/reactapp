import React, { PropTypes } from 'react'
import Job from './Job'

const JobsList = ({ jobs }) => (
  <ul>
    {jobs.map(job =>
      <Job
        key={job.id}
        {...job}
      />
    )}
  </ul>
)

JobsList.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    hash: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default JobsList
