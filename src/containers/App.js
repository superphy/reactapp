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
import { saveStore } from '../middleware/accounts'
// redux
import { connect } from 'react-redux'
// links
import {
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
  componentWillUpdate(){
    console.log('App will update')
    // Foces store to sync will any change.
    if (this.state.token){
      console.log('Posting store...')
      saveStore( this.props.jobs, this.state.token)
    }
  }
  render(){
    const { token, fetched } = this.state;
    var navItems = [{
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
                  {version} <a href="https://github.com/superphy/spfy">superphy/spfy</a>
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
