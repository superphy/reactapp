import React, { Component } from 'react';
import { LinearProgress } from 'react-md'

class Callback extends Component {
  render() {

    return (
      <div>
          <LinearProgress key="progress" id='contentLoadingProgress' />
          <p>
            Handling auth...
          </p>
      </div>
    );
  }
}

export default Callback;
