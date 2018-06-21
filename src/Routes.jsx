import React from 'react';
import { Switch, Route } from 'react-router-dom';
// Actual Code
import { Home } from './components/Home'
// module
import Fishers from './containers/Fishers'
import Subtyping from './containers/Subtyping'
import Metadata from './containers/Metadata'
import Database from './containers/Database'
import Panseq from './containers/Panseq'
import Search from './containers/Search'
// others
import Results from './containers/Results'
import VisibleResult from './containers/VisibleResult'
import { dirpath } from './middleware/api'

export const HOME = dirpath + '/'
export const FISHERS = dirpath + '/fishers'
export const SUBTYPING = dirpath + '/subtyping'
export const METADATA = dirpath + '/metadata'
export const DATABASE = dirpath + '/database'
export const PANSEQ = dirpath + '/panseq'
export const RESULTS = dirpath + '/results'
export const SEARCH = dirpath + '/search'
export const VISIBLE_RESULT = dirpath + '/results/:hash'

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

const Routes = (token) => (
  <Switch>
    <PropsRoute exact path={HOME} component={Home} token={token.token} />
    <PropsRoute path={FISHERS} component={Fishers} token={token.token} />
    <PropsRoute path={SUBTYPING} component={Subtyping} token={token.token} />
    <PropsRoute path={METADATA} component={Metadata} token={token.token} />
    <PropsRoute path={DATABASE} component={Database} token={token.token} />
    <PropsRoute path={PANSEQ} component={Panseq} token={token.token} />
    <PropsRoute path={SEARCH} component={Search} token={token.token} />
    <PropsRoute exact path={RESULTS} component={Results} token={token.token}/>
    <PropsRoute path={VISIBLE_RESULT} component={VisibleResult} token={token.token} />
  </Switch>
)

export default Routes;
