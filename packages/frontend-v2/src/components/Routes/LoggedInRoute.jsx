import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import { useUser } from "hooks/useUser";

export const LoggedInRoute = ({ children, ...props }) => {
  const { isLoggedIn } = useUser();
  return (
    <Route {...props}>
      {isLoggedIn ? <>{children}</> : <Redirect to={{ pathname: "/login" }} />}
    </Route>
  );
};

LoggedInRoute.propTypes = {
  children: PropTypes.node.isRequired
};
