import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import useUser from "../../hooks/useUser";
import { roles } from "./constants";

const Authorizer = ({ children, role, history }) => {
  const [, isLoggedIn] = useUser();
  useEffect(() => {
    if (isLoggedIn && role === roles.GUEST) {
      history.replace("/");
    } else if (!isLoggedIn && role === roles.ADMIN) {
      history.replace("/login");
    }
  }, [isLoggedIn]);
  return (isLoggedIn && role === roles.GUEST) ||
    (!isLoggedIn && role === roles.ADMIN) ? null : (
    <Fragment>{children}</Fragment>
  );
};

Authorizer.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.oneOf(Object.keys(roles).map(key => roles[key])).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(Authorizer);
