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
import ResultSearch from './ResultSearch';

const ResultsTemplates = ({ job, ...props }) => {
  switch (job.analysis) {
    case 'fishers':
      return <RedirectToken token={props.token}>
        <ResultFishers jobId={job.hash} />
      </RedirectToken>
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
      return <RedirectToken token={props.token}>
        <ResultPhylotyper jobId={job.hash} />
      </RedirectToken>
    case "Panseq":
      return <RedirectToken token={props.token}>
        <ResultPanseq jobId={job.hash} />
      </RedirectToken>
    case "bulk":
      return <RedirectToken token={props.token}>
        <ResultBulk />
      </RedirectToken>
    case "metadata":
      return <RedirectToken token={props.token}>
        <ResultMetadata />
      </RedirectToken>
    case "database":
      return <RedirectToken token={props.token}>
        <ResultDatabase jobId={job.hash} />
      </RedirectToken>
    case "search":
      return <RedirectToken token={props.token}>
        <ResultSearch jobId={job.hash} />
      </RedirectToken>
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
