import React, { PureComponent } from 'react';
import { Redirect } from 'react-router'

class Bulk extends PureComponent {
  render(){
    return (
      <Redirect to={'/database'} />
    )
  }
}

export default Bulk
