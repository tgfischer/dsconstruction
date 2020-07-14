import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { ToastProvider } from "react-toast-notifications";

import { LoggedInRoute, LoggedOutRoute } from "components/Routes";
import { HomePage } from "components/HomePage";
import { GalleryPage } from "components/GalleryPage";
import { ContactPage } from "components/ContactPage";
import { LoginPage } from "components/LoginPage";
import { ResetPasswordPage } from "components/ResetPasswordPage";
import { DashboardPage } from "components/DashboardPage";
import { ModalProvider } from "components/Modal";

export const App = () => (
  <ModalProvider>
    <CookiesProvider>
      <ToastProvider placement="bottom-left" autoDismiss>
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
            <LoggedOutRoute path="/login/reset" exact>
              <ResetPasswordPage />
            </LoggedOutRoute>
            <LoggedInRoute path="/dashboard">
              <DashboardPage />
            </LoggedInRoute>
          </Switch>
        </Router>
      </ToastProvider>
    </CookiesProvider>
  </ModalProvider>
);
