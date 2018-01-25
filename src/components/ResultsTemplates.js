// displays the view corresponding to job.analysis
import React, { PropTypes } from 'react'
import ResultFishers from './ResultFishers'
import ResultSubtyping from './ResultSubtyping'
import ResultPhylotyper from './ResultPhylotyper'
import ResultDatabase from './ResultDatabase'
import ResultBulk from './ResultBulk'
import ResultMetadata from './ResultMetadata'
import ResultPanseq from './ResultsPanseq'
import RedirectToken from '../components/RedirectToken'

function EmbedToken(props){
  return (
    <div>
    <RedirectToken token={props.token} />
    {props.children}
    </div>
  )
}

const ResultsTemplates = ({ job, ...props }) => {
  {console.log(props)}
  switch (job.analysis) {
    case 'fishers':
      return <ResultFishers jobId={job.hash} />
    case "Virulence Factors and Serotype":
      return <EmbedToken token={props.token}>
        <ResultSubtyping jobId={job.hash} />
      </EmbedToken>
    case "Phylotyper":
      return <ResultPhylotyper jobId={job.hash} />
    case "Virulence Factors":
      return <ResultSubtyping jobId={job.hash} />
    case "Serotype":
      return <ResultSubtyping jobId={job.hash} />
    case "Antimicrobial Resistance":
      return <ResultSubtyping jobId={job.hash} />
    case "Subtyping":
      return <ResultSubtyping jobId={job.hash} />
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
