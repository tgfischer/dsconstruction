import React from "react";
import PropTypes from "prop-types";

import { Spinner } from "components/Spinner";
import { Footer } from "components/Footer";

export const Layout = ({ isLoading, children }) => (
  <>
    {isLoading && <Spinner className="vh-100" isCentered />}
    {children}
    <Footer />
  </>
);

Layout.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired
};

Layout.defaultProps = {
  isLoading: false
};
