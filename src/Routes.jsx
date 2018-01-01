import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Actual Code
import Home from './components/Home'
// module
import Register from './containers/Register'
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

const handleAuthentication = (auth, nextState, replace) => {
  console.log(auth)
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
    <Route exact path="/" component={Home} />
    <PropsRoute path="/login" component={Login} auth={auth}/>
    <PropsRoute path="/logout"  component={Logout} auth={auth}/>
    <PropsRoute path='/accounts' component={Accounts} auth={auth.auth} />
    <Route exact path="/register" component={Register} />
    <Route path="/fishers" component={Fishers} />
    <Route path="/subtyping" component={Subtyping} />
    <Route path="/metadata" component={Metadata} />
    <Route path="/database" component={Database} />
    <Route path="/panseq" component={Panseq} />
    <Route exact path="/results" component={Results} />
    <Route path="/results/:hash" component={VisibleResult} />
    <Route path="/callback" render={(props) => {
      handleAuthentication(auth, props);
      return <Callback {...props} />
    }}/>
  </Switch>
)

export default Routes;
