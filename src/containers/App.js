import React from 'react'
import { Route, Switch } from 'react-router-dom'
// Components from react-md
import NavigationDrawer from 'react-md/lib/NavigationDrawers'
import NavLink from '../containers/NavLink'
import Home from '../containers/Home'
import Results from '../containers/Results'

var navItems = [{
  exact: true,
  label: 'Tasks',
  to: '/',
  icon: 'dashboard'
}, {
  label: 'Results',
  to: '/results',
  icon: 'bubble_chart'
}];

const App = () => (
  <div>
      <Route
        render={({ location }) => (
          <NavigationDrawer
            drawerTitle="spfy"
            toolbarTitle="quick, predictive genomics"
            navItems={navItems.map(props => <NavLink {...props} key={props.to} />)}
          >
            <Switch key={location.key}>
              <Route exact path="/" location={location} component={Home} />
              <Route path="/results" location={location} component={Results} />
            </Switch>
          </NavigationDrawer>
        )}
      />
  </div>
)

export default App
