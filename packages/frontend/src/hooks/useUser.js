import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => (
  <UserContext.Provider value={useState({})}>{children}</UserContext.Provider>
);

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default () => {
  const [state, setState] = useContext(UserContext);
  return [state, user => setState({ ...user })];
};
