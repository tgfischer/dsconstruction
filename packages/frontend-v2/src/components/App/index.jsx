import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { HomePage } from "components/HomePage";
import { GalleryPage } from "components/GalleryPage";

export const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/gallery">
        <GalleryPage />
      </Route>
    </Switch>
  </Router>
);
