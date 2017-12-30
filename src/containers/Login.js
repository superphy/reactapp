import React, { PureComponent } from 'react';
// react-md
import {
  TextField,
  Button,
  Subheader,
} from 'react-md';
// import TextField from 'react-md/lib/TextFields';
// import Button from 'react-md/lib/Buttons';
// redux
import { connect } from 'react-redux'
import { addJob } from '../actions'
// axios
import axios from 'axios'
import { API_ROOT } from '../middleware/api'
// router
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
// auth0
import Auth from '../middleware/Auth.js';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      submitted: false
    }
  }
  _updateEmail = (value) => {
    this.setState({ email: value })
  }
  _updatePassword = (value) => {
    this.setState({ password: value })
  }
  _handleSubmit = (e) => {
    e.preventDefault() // disable default HTML form behavior
    // create form data with files
    var data = new FormData()
    data.append('email', this.state.email)
    data.append('password', this.state.password)
    // post
    axios.post(API_ROOT + 'login', data)
      .then(response => {
        console.log(response)
        let jobId = response.data
        this.setState({jobId})
        // handle the return
        this.props.dispatch(addJob(jobId,
          'database',
          new Date().toLocaleTimeString(),
          String('Database status as of: ' + new Date().toLocaleTimeString())
        ))
        this.setState({submitted: true})
      })
  };
  render(){
    const { submitted, email, password } = this.state
    const auth = new Auth();
    return (
      <div>
        {auth.login()}
      </div>
    )
  }
}

Login = connect()(Login)

export default Login
