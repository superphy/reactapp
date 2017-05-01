import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import Paper from 'react-md/lib/Papers';
import Group from './Group';

const groups = [
  "http://www.biointerchange.org/gfvo#Description",
  "http://www.biointerchange.org/gfvo#DNASequence",
  "http://www.biointerchange.org/gfvo#Identifier",
  "https://www.github.com/superphy#hasPart",
  "https://www.github.com/superphy#isFoundIn",
  "http://biohackathon.org/resource/faldo#Position",
  "http://purl.obolibrary.org/obo/GENEPIO_0001076",
  "http://purl.obolibrary.org/obo/GENEPIO_0001077",
  "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
  "http://www.w3.org/2000/01/rdf-schema#domain",
  "http://www.w3.org/2000/01/rdf-schema#range",
  "http://www.w3.org/2000/01/rdf-schema#subClassOf",
  "http://www.w3.org/2000/01/rdf-schema#subPropertyOf",
  "http://purl.org/dc/elements/1.1/description",
  "http://purl.org/dc/elements/1.1/date",
  "http://purl.org/dc/elements/1.1/identifier"
]

export default class Home extends PureComponent {
  render() {
    return (
      <div className="md-grid">
        <div className="paper-container">
          <form>
            <Paper>
                <Group groups={groups}></Group>
            </Paper>
            <Paper>
                <Group groups={groups}></Group>
            </Paper>
          </form>
        </div>
      </div>
    );
  }
}
