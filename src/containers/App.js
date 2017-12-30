import React from 'react'
import { Route, Switch } from 'react-router-dom'
// Components from react-md
import NavigationDrawer from 'react-md/lib/NavigationDrawers'
import NavLink from '../containers/NavLink'
// Actual Code
import Home from '../components/Home'
// module
import Login from '../containers/Login'
import Register from '../containers/Register'
import Fishers from '../containers/Fishers'
import Subtyping from '../containers/Subtyping'
import Metadata from '../containers/Metadata'
import Database from '../containers/Database'
import Panseq from '../containers/Panseq'
// others
import Results from '../containers/Results'
import VisibleResult from './VisibleResult'
import Avatar from 'react-md/lib/Avatars';
import logo from '../spfy.png'
import { version } from '../middleware/api'

var navItems = [{
  label: 'Login',
  to: '/login',
  icon: 'account_circle'
},{
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
            navItems={
              navItems.map(props => <NavLink {...props} key={props.to} />)
            }
          >
            <Switch key={location.key}>
              <Route exact path="/" location={location} component={Home} />
              <Route exact path="/login" location={location} component={Login} />
              <Route exact path="/register" location={location} component={Register} />
              <Route path="/fishers" location={location} component={Fishers} />
              <Route path="/subtyping" location={location} component={Subtyping} />
              <Route path="/metadata" location={location} component={Metadata} />
              <Route path="/database" location={location} component={Database} />
              <Route path="/panseq" location={location} component={Panseq} />
              <Route exact path="/results" location={location} component={Results} />
              <Route path="/results/:hash" location={location} component={VisibleResult} />
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
