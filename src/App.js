import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Home from './Home';
import Blog from './Blog';
import { SnapcodeComponent } from './SocialMedia';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/snapcode" component={SnapcodeComponent} />
    </div>
  </Router>
)

export default App;
