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

class App extends Component {
  login() {
    this.props.auth.login();
  }
  logout() {
    this.props.auth.logout();
  }
  render(){
    const { isAuthenticated } = this.props.auth;

    var navLogin = !isAuthenticated?{
      label: 'Logout',
      to: '/logout',
      icon: 'account_circle'
    }:{
      label: 'Login',
      to: '/login',
      icon: 'account_circle'
    }
    var navItems = [navLogin,{
      exact: true,
      label: 'Tasks',
      to: '/',
      icon: 'dashboard'
    }, {
      label: 'Results',
      to: '/results',
      icon: 'bubble_chart'
    }];

    return (
      <div>
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
              For Contact, Email: chadr.laing@canada.ca
              <br></br>
              {version} <a href="https://github.com/superphy/backend">superphy/backend</a>
          </p>
        </NavigationDrawer>
      </div>
    )
  }
}

export default App
