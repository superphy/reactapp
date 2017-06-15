import React, { PropTypes } from 'react'
import Job from './Job'

const JobsList = ({ jobs }) => (
  <div>
    {jobs.map(job =>
      <Job
        key={job.id}
        {...job}
      />
    )}
  </div>
)

JobsList.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    hash: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default JobsList
