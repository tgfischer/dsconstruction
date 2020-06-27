import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import { LoggedInRoute, LoggedOutRoute } from "components/Routes";
import { HomePage } from "components/HomePage";
import { GalleryPage } from "components/GalleryPage";
import { ContactPage } from "components/ContactPage";
import { LoginPage } from "components/LoginPage";
import { DashboardPage } from "components/DashboardPage";

export const App = () => (
  <CookiesProvider>
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
        <LoggedOutRoute path="/login" exact>
          <LoginPage />
        </LoggedOutRoute>
        <LoggedInRoute path="/dashboard">
          <DashboardPage />
        </LoggedInRoute>
      </Switch>
    </Router>
  </CookiesProvider>
);
