export const subtypingDescription = (file, pi, serotype, vf, amr, pan, prob, stx1, stx2, eae) => {
  // parses files and options to generate a human-readable description
  let s = ''
  s += file
  if(serotype||vf||amr){
    s += ' with pi: ' + pi
    s += ' for '
    if(serotype){s+= ' Serotype'}
    if(vf){s+= ' VF'}
    if(amr){s+= ' AMR'}
  }
  // if(pan){s+= ' pan'}
  if(stx1||stx2||stx3){
    s += ' with probability: ' + prob
    s += ' for '
    if(stx1){s+= ' Stx1 '}
    if(stx2){s+= ' Stx2'}
    if(eae){s+= ' Eae'}
  }
  return s;
}
