import React, { Fragment } from "react";
import { Router, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createBrowserHistory } from "history";
import { RequestProvider } from "react-request-hook";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import { CookiesProvider } from "react-cookie";
import axios from "axios";

import withAuthorizer, { roles } from "../Authorizer";
import Home from "../Home";
import Login from "../Login";
import ResetPassword from "../ResetPassword";
import Modal from "../Modal";
import { ModalProvider } from "../../hooks/useModal";
import theme from "../../themes/default";

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
              </Fragment>
            </Router>
            <Modal />
          </CookiesProvider>
        </ModalProvider>
      </SnackbarProvider>
    </RequestProvider>
  </MuiThemeProvider>
);

export default App;
