import React from 'react'
import { Route, Switch } from 'react-router-dom'
// Components from react-md
import NavigationDrawer from 'react-md/lib/NavigationDrawers'
import NavLink from '../containers/NavLink'
import Home from '../containers/Home'
import Results from '../containers/Results'
// import ResultsTemplates from '../containers/ResultsTemplates'
import VisibleResult from './VisibleResult'
import Avatar from 'react-md/lib/Avatars';
import logo from '../spfy.png'

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
            drawerHeaderChildren={
              <Avatar src={logo} alt="logo" />
            }
            toolbarStyle={{'visibility':'hidden'}}
            navItems={navItems.map(props => <NavLink {...props} key={props.to} />)}
          >
            <Switch key={location.key}>
              {console.log(location)}
              <Route exact path="/" location={location} component={Home} />
              <Route exact path="/results" location={location} component={Results} />
              <Route path="/results/:hash" location={location} component={VisibleResult} />
            </Switch>
          </NavigationDrawer>
        )}
      />
  </div>
)

export default App
