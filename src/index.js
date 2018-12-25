import registerServiceWorker from './registerServiceWorker';

import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Home from './Pages/Home';
import Blog from './Pages/Blog';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/blog" component={Blog} />
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
