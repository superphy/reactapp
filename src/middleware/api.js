import React from 'react'
const ROOT = window.location.protocol + '//' + window.location.hostname + ':8000/'
// const ROOT = 'http://10.139.14.212:8000/'
// const ROOT = 'http://192.168.0.16:8000/'
export const API_ROOT = ROOT + 'api/v0/'
export const OLD_API = ROOT

export const version = 'v.4.3.3'
export const analyses = [{
  'analysis':'subtyping',
  'description':'Serotype, Virulence Factors, Antimicrobial Resistance, Shiga-toxin & Intimin',
  'text':(
    <p>
      Upload genome files & determine associated subtypes.
      <br></br>
      Serotyping is powered by <a href="https://github.com/phac-nml/ecoli_serotyping">ECTyper</a>.
      AMR is powered by <a href="https://card.mcmaster.ca/analyze/rgi">CARD</a>.
      Shiga-toxin and Intimin is powered by <a href="https://github.com/superphy/insilico-subtyping/">Phylotyper</a>.
    </p>
  )
},{
  'analysis': 'metadata',
  'description': 'Submit metadata in the form of a .csv for upload to the database.',
  'text': ''
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
  'description': 'Load a pan-genome into the database for secondary analyses.',
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
