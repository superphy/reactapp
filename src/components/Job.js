import React, { PropTypes } from 'react'
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';

const Job = ({ onClick, hash }) => (
  <Card style={{ maxWidth: 600 }} className="md-block-centered">
    <CardTitle
      avatar={<Avatar icon={<FontIcon iconClassName="fa fa-rocket" />} random />}
      title="Card Title"
      subtitle={hash}
    />
  </Card>
)

Job.propTypes = {
  onClick: PropTypes.func.isRequired,
  hash: PropTypes.string.isRequired
}

export default Job
