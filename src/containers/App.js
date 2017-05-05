import React from 'react'
import { Route, Switch } from 'react-router-dom'
// Components from react-md
import NavigationDrawer from 'react-md/lib/NavigationDrawers'
import NavLink from '../containers/NavLink'
import Home from '../containers/Home'
// Redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as GroupActions from '../actions/group'

const navItems = [{
  exact: true,
  label: 'Home',
  to: '/',
  icon: 'home',
}];

const App = (groups, actions) => (
  <div>
      <Route
        // passing groups & actions to every route as props
        groups={groups}
        actions={actions}
        render={({ location }) => (
          <NavigationDrawer
            drawerTitle="spfy"
            toolbarTitle="Group Comparisons"
            navItems={navItems.map(props => <NavLink {...props} key={props.to} />)}
          >
            <Switch key={location.key}>
              <Route exact path="/" location={location} component={Home} />
            </Switch>
          </NavigationDrawer>
        )}
      />
  </div>
)

function mapStateToProps(state) {
  return {
    groups: state.groups
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GroupActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
