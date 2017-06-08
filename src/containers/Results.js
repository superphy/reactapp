import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import JobsList from '../components/JobsList'

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs
  }
}

// const onJobClick = (id) => {
//   return (
//     <Link
//       to={"/results/"+id}
//       className="list-group-item"
//       key={id}>
//       {id}
//     </Link>
//   )
// }

const mapOnJobClickToProps = (onJobClick) => {
  return {
    onJobClick: (id) => {
      return (
        <Link
          to={"/results/"+id}
          className="list-group-item"
          key={id}>
          {id}
        </Link>
      )
    }
  }
}

const Results = connect(
  mapStateToProps,
  mapOnJobClickToProps
)(JobsList)

export default Results
