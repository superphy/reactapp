import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import invariant from 'redux-immutable-state-invariant';
import reducer from '../reducers';
import * as actionCreators from '../actions';

export let isMonitorAction;
export default function configureStore(preloadedState) {
  const composeEnhancers = composeWithDevTools({ actionCreators });
  const store = createStore(reducer, preloadedState, composeEnhancers(
    applyMiddleware(invariant())
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
