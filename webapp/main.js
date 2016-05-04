import React from 'react';
import {render} from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';

import App from './components/App.js';
import Home from './components/Home.js';
import Evt from './components/Event.js';
import Token from './components/Token.js';
import Four04 from './components/404.js';

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="404" component={Four04}/>
      <Route path=":event" component={Evt}>
        <IndexRoute component={Four04} />
        <Route path=":token" component={Token} />
      </Route>
    </Route>
  </Router>
)

render(router, document.getElementById('app'))
