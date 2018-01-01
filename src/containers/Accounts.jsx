import React, { Component } from 'react';
import Login from '../containers/Login';
import Logout from '../containers/Logout';

class Accounts extends Component {
  render(){
    const { isAuthenticated } = this.props.auth;
    console.log('Accounts')
    console.log(this.props.auth)
    console.log(isAuthenticated())
    return (
      <div className="md-text-container md-grid">
        <div className="md-cell md-cell--12">
          {!isAuthenticated()?
            <p>Login</p>
            :<p>Logout</p>
          }
        </div>
      </div>
    )
  }
}

export default Accounts
