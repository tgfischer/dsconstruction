import React from "react";
import PropTypes from "prop-types";
import App, { Container } from "next/app";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { RequestProvider } from "react-request-hook";
import { SnackbarProvider } from "notistack";
import JssProvider from "react-jss/lib/JssProvider";
import axios from "axios";

import "typeface-roboto";

import { ModalProvider } from "../hooks/useModal";
import { UserProvider } from "../hooks/useUser";
import Fonts from "../components/Fonts";
import Modal from "../components/Modal";
import getPageContext from "../config/pageContext";

class DsConstruction extends App {
  constructor() {
    super();
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    Fonts();

    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            <CssBaseline />
            <RequestProvider value={axios}>
              <SnackbarProvider maxSnack={1}>
                <UserProvider>
                  <ModalProvider>
                    <Component pageContext={this.pageContext} {...pageProps} />
                    <Modal />
                  </ModalProvider>
                </UserProvider>
              </SnackbarProvider>
            </RequestProvider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}

DsConstruction.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default DsConstruction;
