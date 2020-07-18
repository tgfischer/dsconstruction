import React from "react";
import PropTypes from "prop-types";

import { Spinner } from "components/Spinner";

export const Layout = ({ isLoading, children }) => (
  <div className="pb-5">
    {isLoading && <Spinner className="vh-100" isCentered />}
    {children}
  </div>
);

Layout.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired
};

Layout.defaultProps = {
  isLoading: false
};
