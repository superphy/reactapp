import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import invariant from 'redux-immutable-state-invariant'
import { createLogger } from 'redux-logger'
import reducer from '../reducers'
import * as actionCreators from '../actions'

const middleware = [invariant()]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export let isMonitorAction;

export default function configureStore(preloadedState) {
  const composeEnhancers = composeWithDevTools({ actionCreators });
  const store = createStore(reducer, preloadedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), composeEnhancers(
    applyMiddleware(...middleware)
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
