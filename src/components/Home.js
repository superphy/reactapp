// displays cards for all possible tasks/analysis

import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import CardActions from 'react-md/lib/Cards/CardActions'
import Button from 'react-md/lib/Buttons/Button'
import Avatar from 'react-md/lib/Avatars'
import { analyses } from '../middleware/api'
import { HOME } from '../Routes'
import { tokenPostfix } from '../middleware/bearer'

const Home = () => (
  <div>
    {analyses.map(analysis =>
      <Card style={{ maxWidth: 600 }} key={analysis.analysis}>
        <CardTitle
          avatar={<Avatar random >{analysis.analysis.substring(0,2)}</Avatar>}
          title={analysis.analysis}
          subtitle={analysis.description}
        />
        <CardActions expander>
          <Link to={HOME + analysis.analysis + tokenPostfix(location.pathname)}>
            <Button flat primary label="Go">input</Button>
          </Link>
        </CardActions>
        <CardText expandable>
          {analysis.text}
        </CardText>
      </Card>
    )}
  </div>
)

export default Home
