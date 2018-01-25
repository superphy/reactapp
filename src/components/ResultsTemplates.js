// displays the view corresponding to job.analysis
import React, { PropTypes } from 'react'
import ResultFishers from './ResultFishers'
import ResultSubtyping from './ResultSubtyping'
import ResultPhylotyper from './ResultPhylotyper'
import ResultDatabase from './ResultDatabase'
import ResultBulk from './ResultBulk'
import ResultMetadata from './ResultMetadata'
import ResultPanseq from './ResultsPanseq'
import { RedirectToken } from '../components/RedirectToken'

const ResultsTemplates = ({ job, ...props }) => {
  {console.log(props)}
  switch (job.analysis) {
    case 'fishers':
      return <ResultFishers jobId={job.hash} />
    // Fall through cases for the Subtyping card.
    case "Virulence Factors and Serotype":
    case "Virulence Factors":
    case "Serotype":
    case "Antimicrobial Resistance":
    case "Subtyping":
      return <RedirectToken token={props.token}>
        <ResultSubtyping jobId={job.hash} />
      </RedirectToken>
    case "Phylotyper":
      return <ResultPhylotyper jobId={job.hash} />
    case "Panseq":
      return <ResultPanseq jobId={job.hash} />
    case "bulk":
      return <ResultBulk />
    case "metadata":
      return <ResultMetadata />
    case "database":
      return <ResultDatabase jobId={job.hash} />
    default:
      return <div>ERROR: no matching analysis view found.</div>
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
