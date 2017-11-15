import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

require('./styles/main.scss');

render((
    <Router >
      <div>
          Insert Code Here
      </div>
    </Router>
  ),
    document.getElementById('app')

);
