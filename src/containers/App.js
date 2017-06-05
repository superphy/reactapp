import React from 'react'
import { Route, Switch } from 'react-router-dom'
// Components from react-md
import NavigationDrawer from 'react-md/lib/NavigationDrawers'
import NavLink from '../containers/NavLink'
import Home from '../containers/Home'

var navItems = [{
  exact: true,
  label: 'New Comparison',
  to: '/',
  icon: 'add_box',
}];

const App = () => (
  <div>
      <Route
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

export default App
