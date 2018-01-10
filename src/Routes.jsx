import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Actual Code
import Home from './components/Home'
// module
import Fishers from './containers/Fishers'
import Subtyping from './containers/Subtyping'
import Metadata from './containers/Metadata'
import Database from './containers/Database'
import Panseq from './containers/Panseq'
// others
import Results from './containers/Results'
import VisibleResult from './containers/VisibleResult'
// auth0
import Callback from './middleware/Callback';
import Login from './containers/Login';
import Logout from './containers/Logout';
import Accounts from './containers/Accounts';
// // dirpath
// import {
//   HOME,
//   LOGIN,
//   LOGOUT,
//   ACCOUNTS,
//   FISHERS,
//   SUBTYPING,
//   METADATA,
//   DATABASE,
//   PANSEQ,
//   RESULTS,
//   VISIBLE_RESULT,
//   CALLBACK
// } from './routes'

import { dirpath } from './middleware/api'

export const HOME = dirpath + '/'
export const LOGIN = dirpath + '/login'
export const LOGOUT = dirpath + '/logout'
export const ACCOUNTS = dirpath + '/accounts'
export const FISHERS = dirpath + '/fishers'
export const SUBTYPING = dirpath + '/subtyping'
export const METADATA = dirpath + '/metadata'
export const DATABASE = dirpath + '/database'
export const PANSEQ = dirpath + '/panseq'
export const RESULTS = dirpath + '/results'
export const VISIBLE_RESULT = dirpath + '/results/:hash'
export const CALLBACK = dirpath + '/callback'

const handleAuthentication = (auth, nextState, replace) => {
  console.log('Routes sees')
  console.log(auth, nextState, replace)
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.auth.handleAuthentication();
    console.log(auth)
  }
}

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

const Routes = (auth) => (
  <Switch>
    <Route exact path={HOME} component={Home} />
    <PropsRoute path={LOGIN} component={Login} auth={auth}/>
    <PropsRoute path={LOGOUT}  component={Logout} auth={auth}/>
    <PropsRoute path={ACCOUNTS} component={Accounts} auth={auth.auth} />
    <Route path={FISHERS} component={Fishers} />
    <Route path={SUBTYPING} component={Subtyping} />
    <Route path={METADATA} component={Metadata} />
    <Route path={DATABASE} component={Database} />
    <Route path={PANSEQ} component={Panseq} />
    <Route exact path={RESULTS} component={Results} />
    <Route path={VISIBLE_RESULT} component={VisibleResult} />
    <Route path={CALLBACK} render={(props) => {
      handleAuthentication(auth, props);
      return <Callback {...props} auth={auth.auth}/>
    }}/>
  </Switch>
)

export default Routes;
