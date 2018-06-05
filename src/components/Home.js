// displays cards for all possible tasks/analysis

import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import CardActions from 'react-md/lib/Cards/CardActions'
import Button from 'react-md/lib/Buttons/Button'
import Avatar from 'react-md/lib/Avatars'
import { analyses, extra } from '../middleware/api'
import { HOME } from '../Routes'
import { RedirectToken } from '../components/RedirectToken'

const maxWidth = 600;

const card = (analysis) => (
  <Card style={{ maxWidth: maxWidth }} key={analysis.analysis}>
    <CardTitle
      avatar={<Avatar random >{analysis.analysis.substring(0,2)}</Avatar>}
      title={analysis.analysis}
      subtitle={analysis.description}
    />
    <CardActions expander>
      <Link to={HOME + analysis.analysis}>
        <Button flat primary label="Go">input</Button>
      </Link>
    </CardActions>
    <CardText expandable>
      {analysis.text}
    </CardText>
  </Card>
);

const header = (name) => (
  <Card style={{ maxWidth: maxWidth }} key={name + 'divider'}>
    <CardTitle
      title={name}
    />
  </Card>
)

export function Home(props){
  return (
    <RedirectToken token={props.token}>
      <div>
        <div>
          {header('Main Analyses')}
          {analyses.map(analysis =>
            card(analysis)
          )}
        </div>
        <div>
          {header('Extra Analyses')}
          {extra.map(analysis =>
            card(analysis)
          )}
        </div>
      </div>
    </RedirectToken>
  )
}
