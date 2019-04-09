import React, { Fragment } from "react";
import { Router, Route, Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createBrowserHistory } from "history";
import { RequestProvider } from "react-request-hook";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import { CookiesProvider } from "react-cookie";
import { ModalProvider } from "react-modal-hook";
import axios from "axios";

import Home from "./Home";
import GalleryPage from "./Gallery";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import DashboardSettings from "./DashboardSettings";
import DashboardHome from "./DashboardHome";
import DashboardServices from "./DashboardServices";
import DashboardGallery from "./DashboardGallery";
import DashboardContact from "./DashboardContact";
import withAuthorizer, { roles } from "./Authorizer";
import theme from "../themes/default";

const App = () => (
  <MuiThemeProvider theme={theme}>
    <RequestProvider value={axios}>
      <SnackbarProvider maxSnack={1}>
        <ModalProvider>
          <CookiesProvider>
            <CssBaseline />
            <Router history={createBrowserHistory()}>
              <Fragment>
                <Route exact path="/" component={Home} />
                <Route
                  exact
                  path="/login"
                  component={withAuthorizer(roles.GUEST, Login)}
                />
                <Route
                  exact
                  path="/reset/:type"
                  component={withAuthorizer(roles.GUEST, ResetPassword)}
                />
                <Route exact path="/gallery" component={GalleryPage} />
                <Route
                  exact
                  path="/dashboard"
                  render={() => <Redirect to="/dashboard/settings" />}
                />
                <Route
                  exact
                  path="/dashboard/settings"
                  component={withAuthorizer(roles.ADMIN, DashboardSettings)}
                />
                <Route
                  exact
                  path="/dashboard/home"
                  component={withAuthorizer(roles.ADMIN, DashboardHome)}
                />
                <Route
                  exact
                  path="/dashboard/services"
                  component={withAuthorizer(roles.ADMIN, DashboardServices)}
                />
                <Route
                  exact
                  path="/dashboard/gallery"
                  component={withAuthorizer(roles.ADMIN, DashboardGallery)}
                />
                <Route
                  exact
                  path="/dashboard/contact"
                  component={withAuthorizer(roles.ADMIN, DashboardContact)}
                />
              </Fragment>
            </Router>
          </CookiesProvider>
        </ModalProvider>
      </SnackbarProvider>
    </RequestProvider>
  </MuiThemeProvider>
);

export default App;
