import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { HomePage } from "components/HomePage";

export const App = () => (
  <Router>
    <Switch>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  </Router>
);
