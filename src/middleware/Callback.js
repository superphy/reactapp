import React, { Component } from 'react';
import { LinearProgress } from 'react-md'
import { Redirect } from 'react-router'

class Callback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sleeping: true
    };
  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async wait() {
    console.log('Taking a break...');
    await this.sleep(3000);
    console.log('3 second later');
    this.setState({sleeping: false})
  }
  componentDidMount(){
    this.wait()
  }
  render() {
    console.log('Callback has')
    console.log(this.props)
    // const { isAuthenticated } = this.props.auth;
    let { sleeping } = this.state
    return (
      <div>
      {sleeping?
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
