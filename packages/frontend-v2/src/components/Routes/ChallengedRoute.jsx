import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import { useUser } from "hooks/useUser";

export const ChallengedRoute = ({ children, ...props }) => {
  const { isChallenged } = useUser();
  return (
    <Route {...props}>
      {isChallenged ? <>{children}</> : <Redirect to="/login" />}
    </Route>
  );
};

ChallengedRoute.propTypes = {
  children: PropTypes.node.isRequired
};
