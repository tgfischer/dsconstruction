import React from "react";
import PropTypes from "prop-types";

import { Spinner } from "components/Spinner";

export const Layout = ({ isLoading, children }) => (
  <>
    {isLoading && <Spinner className="vh-100" />}
    {children}
  </>
);

Layout.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired
};

Layout.defaultProps = {
  isLoading: false
};
