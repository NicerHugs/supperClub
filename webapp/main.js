import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import App from './components/App.js';

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
  </Router>
)

render(router, document.getElementById('app'))
