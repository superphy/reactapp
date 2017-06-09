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

class Job extends Component {
  render(){
    // set up for status checking
    const { results } = this.props
    var complete = false
    if (results.fulfilled){
      if (results.value){
        complete = true
      } else {
        complete = false
      }
    }
    // actual card
    return (
      <Card style={{ maxWidth: 600 }}>
        <CardTitle
          avatar={<Avatar random >{this.props.analysis.substring(0,2)}</Avatar>}
          title={this.props.description}
          subtitle={String('Submitted: ' + this.props.date + ', Status: ' + (complete ? 'Complete':'Pending'))}
        />
        <CardText>
          {'JobId: ' + this.props.hash}
        </CardText>
        <CardActions>
          {
            complete ?
              <Link to={'/results/' + this.props.hash}>
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
  results: {url: API_ROOT + `results/${props.hash}`, refreshInterval: 5000 }
}))(Job)
