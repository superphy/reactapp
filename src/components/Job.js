import React, { PropTypes } from 'react'

const Job = ({ onClick, hash }) => (
  <li
    onClick={onClick}
  >
    {hash}
  </li>
)

Job.propTypes = {
  onClick: PropTypes.func.isRequired,
  hash: PropTypes.string.isRequired
}

export default Job
