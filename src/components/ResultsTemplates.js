// displays the view corresponding to job.analysis

import React, { PropTypes } from 'react'
import ResultFishers from './ResultFishers'

const ResultsTemplates = ({ job }) => {
  switch (job.analysis) {
    case 'fishers':
      return <ResultFishers jobId={job.hash} />
  }
}

ResultsTemplates.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.number.isRequired,
    hash: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }).isRequired
}

export default ResultsTemplates
