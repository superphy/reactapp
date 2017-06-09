// Uses the hash key in route to retrieve job data from Redux store
// Passes job data to ResultsTemplates component
import { connect } from 'react-redux'
import ResultsTemplates from '../components/ResultsTemplates'

const getVisibleJob = (jobs, hash) => {
  return jobs.filter(j => j.hash === hash).pop()
}

const mapStateToProps = (state, ownProps) => {
  return {
    job: getVisibleJob(state.jobs, ownProps.match.params.hash)
  }
}

const VisibleResult = connect(
  mapStateToProps
)(ResultsTemplates)

export default VisibleResult
