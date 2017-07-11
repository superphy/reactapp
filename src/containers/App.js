import React from 'react'
import { Route, Switch } from 'react-router-dom'
// Components from react-md
import NavigationDrawer from 'react-md/lib/NavigationDrawers'
import NavLink from '../containers/NavLink'
// Actual Code
import Home from '../components/Home'
// module
import Fishers from '../containers/Fishers'
import Subtyping from '../containers/Subtyping'
import Database from '../containers/Database'
// others
import Results from '../containers/Results'
import VisibleResult from './VisibleResult'
import Avatar from 'react-md/lib/Avatars';
import logo from '../spfy.png'
import { version, dirpath } from '../middleware/api'

var navItems = [{
  exact: true,
  label: 'Tasks',
  to: dirpath,
  icon: 'dashboard'
}, {
  label: 'Results',
  to: dirpath + '/results',
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
            navItems={
              navItems.map(props => <NavLink {...props} key={props.to} />)
            }
          >
            <Switch key={location.key}>
              <Route exact path={dirpath} location={location} component={Home} />
              <Route path={dirpath + "/fishers"} location={location} component={Fishers} />
              <Route path={dirpath + "/subtyping"} location={location} component={Subtyping} />
              <Route path={dirpath + "/database"} location={location} component={Database} />
              <Route exact path={dirpath + "/results"} location={location} component={Results} />
              <Route path={dirpath + "/results/:hash"} location={location} component={VisibleResult} />
            </Switch>
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
        )}
      />
  </div>
)

export default App
