import React, { Fragment } from "react";
import { Router, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createBrowserHistory } from "history";
import { RequestProvider } from "react-request-hook";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import axios from "axios";

import Home from "../Home";
import Login from "../Login";
import ResetPassword from "../ResetPassword";
import Modal from "../Modal";
import { ModalProvider } from "../../hooks/useModal";
import { UserProvider } from "../../hooks/useUser";
import theme from "../../themes/default";

const App = () => (
  <MuiThemeProvider theme={theme}>
    <RequestProvider value={axios}>
      <SnackbarProvider maxSnack={1}>
        <ModalProvider>
          <UserProvider>
            <CssBaseline />
            <Router history={createBrowserHistory()}>
              <Fragment>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/reset/:type" component={ResetPassword} />
              </Fragment>
            </Router>
            <Modal />
          </UserProvider>
        </ModalProvider>
      </SnackbarProvider>
    </RequestProvider>
  </MuiThemeProvider>
);

export default App;
