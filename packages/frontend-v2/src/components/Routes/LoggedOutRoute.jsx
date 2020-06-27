import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import { useUser } from "hooks/useUser";

export const LoggedOutRoute = ({ children, ...props }) => {
  const { isLoggedIn } = useUser();
  return (
    <Route {...props}>
      {isLoggedIn ? <Redirect to={{ pathname: "/" }} /> : <>{children}</>}
    </Route>
  );
};

LoggedOutRoute.propTypes = {
  children: PropTypes.node.isRequired
};
