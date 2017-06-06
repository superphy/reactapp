import { connect } from 'react-redux'
import JobsList from '../components/JobsList'

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs
  }
}

const Results = connect(
  mapStateToProps
)(JobsList)

export default Results
