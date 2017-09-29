export const phylotyperDescription = (file, prob, stx1, stx2, eae) => {
  // parses files and options to generate a human-readable description
  let s = ''
  s += file
  s += ' with probability: ' + prob
  s += ' for '
  if(stx1){s+= ' Stx1 '}
  if(stx2){s+= ' Stx2'}
  if(eae){s+= ' Eae'}
  return s;
}