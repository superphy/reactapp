export const fishersDescription = (groups, target) => {
  // parses groups to generate a human-readable description
  let s = ''
  for(let i in groups){
    for(let j in groups[i]){
      let relation = groups[i][j]
      s += relation.attribute + (relation.logical ? ' ' + relation.logical + ' ' : '')
    }
    s += (i<1 ? ' vs ' : '')
  }
  s += ' for ' + target
  return s;
}
