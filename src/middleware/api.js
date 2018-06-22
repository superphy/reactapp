import React from 'react'
//const ROOT = window.location.protocol + '//' + 'spfy.enchartus.ca' + '/'
const ROOT = window.location.protocol + '//' + window.location.hostname + ':8000/'
// const ROOT = 'https://lfz.corefacility.ca/superphy/spfyapi/'
// const ROOT = 'http://10.139.14.212:8000/'
// const ROOT = 'http://192.168.5.19:8090/'
// const ROOT = 'http://192.168.5.19:8000/'
// const ROOT = 'https://spfy.enchartus.ca/'
export const API_ROOT = ROOT + 'api/v0/'
export const OLD_API = ROOT

export const version = 'v.6.3.0'
export const analyses = [
  {
    'analysis':'subtyping',
    'description':(
      <p style={{color:'gray'}}>Serotype, Virulence Factors, Antimicrobial Resistance, Shiga-toxin & Intimin</p>
    ),
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
    'analysis':'fishers',
    'pseudonym':'statistical comparison',
    'description': (
      <p style={{color:'gray'}}>Identify predictive markers for groups of bacteria based on genome content or
        <br/> metadata, using Fisher's Exact Test</p>
    ),
    'text':'Select groups from uploaded genomes & compare for a chosen target datum.'
  },{
    'analysis': 'search',
    'pseudonym': 'search by accession',
    'description': (
      <p style={{ color: 'gray' }}>Search database results by accession</p>
    ),
    'text': ''
  },
]

export const extra = [
  {
    'analysis': 'database',
    'description': (
      <p style={{color:'gray'}}>Status check of database connection</p>
    ),
    'text': ''
  },{
    'analysis': 'metadata',
    'description': (
      <p style={{color:'gray'}}>Submit metadata in the form of a .csv for upload to the database</p>
    ),
    'text': ''
  },{
    'analysis': 'panseq',
    'description': (
      <p style={{color:'gray'}}>Load a pan-genome into the database for secondary analyses</p>
    ),
    'text': (
      <p>
        Upload genomes & split into pan-genome regions.
        <br></br>+

        Pan-genome is created by <a href="https://lfz.corefacility.ca/panseq/">Panseq</a>.
      </p>
    )
  }
]

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

// for corefacility directory-based hosting
// export const dirpath = '/superphy/spfy'
export const dirpath = ''

// auth0 configs

export const CLIENT_ID = '6TNNpuXZmZaQfnd8m5Jm6y1YS6fqKSmT';
export const CLIENT_DOMAIN = 'spfy.auth0.com';
// export const REDIRECT = 'https://lfz.corefacility.ca/superphy/spfy/callback';
export const REDIRECT = 'http://localhost:8090/callback';
export const SCOPE = 'openid';
export const AUDIENCE = 'https://lfz.corefacility.ca/superphy/spfyapi/';

export const ID_TOKEN_KEY = 'id_token';
export const ACCESS_TOKEN_KEY = 'access_token';

// helper functions for auth0
