import React, { PropTypes } from 'react'
import ResultsTable from './ResultsTable'

const ResultsTemplates = ({ job }) => (
  <div>
    {console.log(job)}
    {console.log(job.hash)}
    <ResultsTable jobId={job.hash} />
  </div>
)
// 
// ResultsTemplates.propTypes = {
//   job: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     hash: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     date: PropTypes.string.isRequired
//   }).isRequired).isRequired
// }

export default ResultsTemplates
