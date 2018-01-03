import React, { Component } from 'react';
import { LinearProgress } from 'react-md'
import { Redirect } from 'react-router'

class Callback extends Component {
  render() {
    console.log('Callback has')
    console.log(this.props)
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
      {!isAuthenticated()?
        <div>
            <LinearProgress key="progress" id='contentLoadingProgress' />
            <p>
              Handling auth...
            </p>
        </div>
        :<div>
          <Redirect to='/accounts' />
        </div>
      }
      </div>
    );
  }
}

export default Callback;
