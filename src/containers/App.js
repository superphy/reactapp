import React, { Component } from 'react';
// Components from react-md
import NavigationDrawer from 'react-md/lib/NavigationDrawers'
import NavLink from '../containers/NavLink'
import Avatar from 'react-md/lib/Avatars';
import logo from '../spfy.png'
import { version } from '../middleware/api'
// react-router
import { withRouter } from 'react-router';
import History from '../History';
import Routes from '../Routes';
// bearer token
import { bearer, tokenTo } from '../middleware/bearer'
import { Redirect } from 'react-router'
// redux
import { connect } from 'react-redux'
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
      token: '',
      fetched: false
    }
  }
  _setToken = (token) => {
    this.setState({'token': token})
  }
  _setFetched = (bool) => {
    // A handler to block render until jobs are fetched.
    this.setState({'fetched': bool})
  }
  componentWillMount(){
    bearer(location, this._setToken, this._setFetched, this.props.dispatch, this.props.jobs)
  }
  render(){
    const { token, fetched } = this.state;
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
        {token?
          <Redirect to={tokenTo(location.pathname, token)}/>
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
            {fetched?<div>
              <Routes key={location.key} token={token} />
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
            </div>:''}
          </NavigationDrawer>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    jobs: state.jobs,
    ...ownProps
  }
}

App = withRouter(
  connect(
  mapStateToProps
)(App))

export default App
