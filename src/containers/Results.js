import { connect } from 'react-redux'
import JobsList from '../components/JobsList'
import { saveStore } from '../middleware/api'

const mapStateToProps = (state) => {
  saveStore(state)
  return {
    jobs: state.jobs
  }
}

const Results = connect(
  mapStateToProps
)(JobsList)

export default Results
