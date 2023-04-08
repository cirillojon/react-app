import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from '.HomePage/pages/HomePage';
import AboutPage from '.AboutPage/pages/AboutPage';
import ContactPage from '.ContactPage/pages/ContactPage';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
    </Switch>
  </Router>
);

export default Routes;
