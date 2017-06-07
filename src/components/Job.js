import React, { PropTypes, Component } from 'react'
import { connect } from 'react-refetch'
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';
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
      <Card style={{ maxWidth: 600 }} className="md-block-centered">
        <CardTitle
          avatar={<Avatar icon={<FontIcon iconClassName="fa fa-rocket" />} random />}
          title={this.props.hash}
          subtitle={complete ? 'Complete':'Pending'}
        />
      </Card>
    )
  }
}

Job.propTypes = {
  onClick: PropTypes.func.isRequired,
  hash: PropTypes.string.isRequired
}

export default connect(props => ({
  results: {url: API_ROOT + `results/${props.hash}`, refreshInterval: 5000 }
}))(Job)
