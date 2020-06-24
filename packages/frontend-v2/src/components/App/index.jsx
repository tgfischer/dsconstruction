import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { HomePage } from "components/HomePage";
import { GalleryPage } from "components/GalleryPage";
import { ContactPage } from "components/ContactPage";

export const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/gallery" exact>
        <GalleryPage />
      </Route>
      <Route path="/contact" exact>
        <ContactPage />
      </Route>
    </Switch>
  </Router>
);
