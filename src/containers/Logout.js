import React, { Component } from 'react';

class Logout extends Component {
  render(){
    console.log(this.props)
    return (
      <div>
        {this.props.auth.auth.logout()}
        Logged out.
      </div>
    )
  }
}

export default Logout