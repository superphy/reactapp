import React, { PropTypes, Component } from 'react'
import { connect } from 'react-refetch'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import CardActions from 'react-md/lib/Cards/CardActions'
import Button from 'react-md/lib/Buttons/Button'
import Avatar from 'react-md/lib/Avatars'
import { Link } from 'react-router-dom'
// requests
import { API_ROOT } from '../middleware/api'
// error msg
import { createErrorMessage } from '../middleware/api'
import { RESULTS } from '../routes'

class Job extends Component {
  render(){
    // set up for status checking
    const { results } = this.props
    var complete = false
    var failed = false
    if (results.pending){
      // this means flask is doing something and hasnt responded yet
      complete = false
    } else if (results.rejected) {
      // this means flask rejected it
      failed = true
    } else if (results.fulfilled){
      // then flask responded with a string
      // in which case, the job either failed of is still pending
      // actual results are in the form of an array
      console.log(results)
      if (typeof(results.value) === 'string'){
        if (results.value === "pending"){
          complete = false
        } else {
          // some error message was received
          failed = true
        }
      } else {
        complete = true
      }
    }
    // actual card
    return (
      <Card style={{ maxWidth: 600 }}>
        <CardTitle
          avatar={<Avatar random >{this.props.analysis.substring(0,2)}</Avatar>}
          title={this.props.description}
          subtitle={String('Submitted: ' + this.props.date + ', Status: ' + (
            !failed?(complete ? 'COMPLETE':'Pending')
              :'FAILED'))}
        />
        <CardText>
          {!failed ? ('JobId: ' + this.props.hash):
            createErrorMessage(this.props.hash, this.props.results.value)
          }
        </CardText>
        <CardActions>
          {
            complete ?
              <Link to={RESULTS + this.props.hash}>
                <Button flat primary label="See Result">input</Button>
              </Link> : ''
          }
        </CardActions>
      </Card>
    )
  }
}

Job.propTypes = {
  hash: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  analysis: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
}

export default connect(props => ({
  results: {url: API_ROOT + `results/${props.hash}`, refreshInterval: 15000 }
}))(Job)
