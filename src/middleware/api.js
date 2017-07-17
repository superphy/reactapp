import React from 'react'
const IP = '10.139.14.212'
const ROOT = window.location.protocol + '//' + IP + ':8000/'
// const ROOT = 'http://10.139.14.212:8000/'
// const ROOT = 'http://192.168.1.67:8000/'
export const API_ROOT = ROOT + 'api/v0/'
export const OLD_API = ROOT

export const version = 'v.4.3.3'
export const analyses = [{
  'analysis':'subtyping',
  'description':'Serotype, Virulence Factors, Antimicrobial Resistance',
  'text':(
    <p>
      Upload genome files & determine associated subtypes.
      <br></br>
      Subtyping is powered by <a href="https://github.com/phac-nml/ecoli_serotyping">ECTyper</a>.
      AMR is powered by <a href="https://card.mcmaster.ca/analyze/rgi">CARD</a>.
    </p>
  )
},{
  'analysis':'fishers',
  'description':"Group comparisons using Fisher's Exact Test",
  'text':'Select groups from uploaded genomes & compare for a chosen target datum.'
},{
  'analysis': 'database',
  'description': 'View all entries currently loaded into the database.',
  'text': ''
},{
  'analysis': 'panseq',
  'description': 'Create a pan-genome.',
  'text': (
    <p>
      Upload genomes & split into pan-genome regions.
      <br></br>+

      Pan-genome is created by <a href="https://lfz.corefacility.ca/panseq/">Panseq</a>.
    </p>
  )
}]

export const createErrorMessage = (jobId, msg='') => {
  const message = <div>
    <p style={{'color': 'red'}}>
      ERROR WITH JOB: {jobId}
    </p>
    <p>
      {msg}
    </p>
  </div>
  return message
}
