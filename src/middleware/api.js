//export const API_ROOT = window.location.protocol + '//' + window.location.hostname + ':8000/api/v0/'
export const API_ROOT = 'http://10.139.14.212:8000/api/v0/'

export const analyses = [{
  'analysis':'subtyping',
  'description':'Serotype, Virulence Factors, Antimicrobial Resistance',
  'text':'Upload genome files & determine associated subtypes.'
},{
  'analysis':'fishers',
  'description':"Group comparisons using Fisher's Exact Test",
  'text':'Select groups from uploaded genomes & compare for a chosen target datum.'
}]
