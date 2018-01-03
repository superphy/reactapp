import React, { Component } from 'react';

class Login extends Component {
  render(){
    console.log(this.props)
    return (
      <div>
        {this.props.auth.auth.login()}
      </div>
    )
  }
}

export default Login
