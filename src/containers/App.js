import React, { Component } from 'react';
// Components from react-md
import NavigationDrawer from 'react-md/lib/NavigationDrawers'
import NavLink from '../containers/NavLink'
import Avatar from 'react-md/lib/Avatars';
import logo from '../spfy.png'
import { version } from '../middleware/api'
// react-router
import History from '../History';
import Routes from '../Routes';
// bearer token
import { bearer } from '../middleware/bearer'
import { Redirect } from 'react-router'
// links
import {
  ACCOUNTS,
  HOME,
  RESULTS
} from '../Routes'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      token: ''
    }
  }
  _setToken = (token) => {
    this.setState({'token': token})
  }
  componentWillMount(){
    bearer(location, this._setToken)
  }
  render(){
    var navItems = [{
      label: 'Account',
      to: ACCOUNTS,
      icon: 'account_circle'
    },{
      exact: true,
      label: 'Tasks',
      to: HOME,
      icon: 'dashboard'
    }, {
      label: 'Results',
      to: RESULTS,
      icon: 'bubble_chart'
    }];

    return (
      <div>
        {this.state.token?
          <Redirect to={location.pathname + '?token=' + this.state.token}/>
        :""}
        <NavigationDrawer
          drawerTitle="spfy"
          drawerHeaderChildren={
            <Avatar src={logo} alt="logo" />
          }
          toolbarStyle={{'visibility':'hidden'}}
          navItems={
            navItems.map(props => <NavLink {...props} key={props.to} />)
          }
        >
          <History />
          <Routes key={location.key} auth={this.props.auth} />
          <p style={{
            'right': 20,
            'top': 20,
            'position': 'absolute',
            'textAlign': 'right'
          }}>
              For Contact, Email: chad.laing@canada.ca
              <br></br>
              {version} <a href="https://github.com/superphy/backend">superphy/backend</a>
          </p>
        </NavigationDrawer>
      </div>
    )
  }
}

export default App
