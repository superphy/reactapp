import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button
} from 'react-md';

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
            <Link to={'/login'}>
              <Button flat primary label="Login">input</Button>
            </Link>
            :<Link to={'/logout'}>
              <Button flat primary label="Logout">input</Button>
            </Link>
          }
        </div>
      </div>
    )
  }
}

export default Accounts
