import React, { Component } from 'react';
// react-router
import { Link } from 'react-router-dom';
// react-md
import {
  Button
} from 'react-md';
// axios
import axios from 'axios'
import { API_ROOT } from '../middleware/api'

class Accounts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dbResponse: '',
      dbAuthResponse: ''
    };
  }

  getDbResponse() {
    const url = `${API_ROOT}ping`;
    axios.get(url)
      .then(response => {
        console.log(response);
        this.setState({dbResponse: response.data})
        return response.data
      })
      .catch(error => {
        console.log(error);
        return error
      });
  }
  getDbAuthResponse() {
    const url = `${API_ROOT}secured/ping`;
    console.log('Accounts sees')
    console.log(this.props.auth.getAccessToken())
    axios.get(url, { headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }})
      .then(response => {
        console.log(response);
        this.setState({dbAuthResponse: response.data})
        return response.data
      })
      .catch(error => {
        console.log(error);
        return error
      });
  }
  componentWillMount() {
    if (this.props.auth.isAuthenticated()){
      console.log('accessToken')
      console.log(this.props.auth.getAccessToken())
      this.getDbResponse()
      this.getDbAuthResponse()
    }
  }
  render(){
    const { isAuthenticated } = this.props.auth;
    const { dbResponse, dbAuthResponse } = this.state;
    console.log('Accounts')
    console.log(this.props.auth)
    console.log(isAuthenticated())
    return (
      <div className="md-text-container md-grid">
        <div className="md-cell md-cell--12">
          {!isAuthenticated()?
            <Link to={'/login'}>
              <Button flat primary label="Login / Register">input</Button>
            </Link>
            :<div>
              <p>dbResponse: {dbResponse}</p>
              <p>dbAuthResponse: {dbAuthResponse}</p>
              <Link to={'/logout'}>
                <Button flat primary label="Logout">input</Button>
              </Link>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Accounts
