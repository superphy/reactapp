export const subtypingDescription = (file, pi, serotype, vf, amr) => {
  // parses files and options to generate a human-readable description
  let s = ''
  s += file
  // // check the length of the file array
  // if (file.length === 1){
  //   s += file.filename
  // } else {
  //   for (let f in file){
  //     // cap name descriptors at length 11-15
  //     if (s.length < 10){
  //       // check length of filename
  //       if (f.filename.length > 5){
  //         s += f.filename.substring(0,6)
  //       } else {
  //         s += f.filename
  //       }
  //     }
  //   }
  //   // if we have length > 10, append ...
  //   if (s.length > 10){
  //     s += '...'
  //   }
  // }
  // end of name handling
  // add options
  s += ' with pi: ' + pi
  s += ' for '
  if(serotype){s+= ' Serotype'}
  if(vf){s+= ' VF'}
  if(amr){s+= ' AMR'}
  return s;
}
