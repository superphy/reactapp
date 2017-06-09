// displays cards for all possible tasks/analysis

import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import CardActions from 'react-md/lib/Cards/CardActions'
import Button from 'react-md/lib/Buttons/Button'
import Avatar from 'react-md/lib/Avatars'

const analyses = [{
  'analysis':'subtyping',
  'description':'Serotype, Virulence Factors, Antimicrobial Resistance',
  'text':'Upload genome files & determine associated subtypes.'
},{
  'analysis':'fishers',
  'description':"Group comparisons using Fisher's Exact Test",
  'text':'Select groups from uploaded genomes & compare for a chosen target datum.'
}]

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
          <Link to={'/' + analysis.analysis}>
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
