// Displays cards for all possible tasks/analysis.
import React from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardTitle,
  CardText,
  CardActions,
  Button,
  Avatar,
} from 'react-md';
import { analyses, extra } from '../middleware/api'
import { HOME } from '../Routes'
import { RedirectToken } from '../components/RedirectToken'
import { maxWidth } from '../middleware/layout'

const card = (analysis) => (
  <Card style={{ maxWidth: maxWidth }} key={analysis.analysis}>
    <CardTitle
      avatar={<Avatar random >{analysis.analysis.substring(0,2)}</Avatar>}
      title={analysis.pseudonym? analysis.pseudonym : analysis.analysis}
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

const style = {
  maxWidth: maxWidth,
  maxHeight: '4em',
}

const header = (name) => (
  <Card style={style} key={name + 'divider'}>
    <CardTitle
      title=''
      subtitle={name}
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
          {header('Extra Modules')}
          {extra.map(analysis =>
            card(analysis)
          )}
        </div>
      </div>
    </RedirectToken>
  )
}
