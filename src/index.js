import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/App';
import './index.css';

import WebFontLoader from 'webfontloader';

// init the one and only redux store for the entire app
const store = configureStore();

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

ReactDOM.render(
    <Router><Provider store={store}><App /></Provider></Router>,
  document.getElementById('root')
);
