import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import useHome from "../hooks/useHome";

export const HomeContext = React.createContext();

const Provider = ({ children }) => {
  useHome();
  return <Fragment>{children}</Fragment>;
};

Provider.propTypes = {
  children: PropTypes.node.isRequired
};

const HomeProvider = ({ children }) => (
  <HomeContext.Provider
    value={useState({
      masthead: {},
      isLoading: false
    })}
  >
    <Provider>{children}</Provider>
  </HomeContext.Provider>
);

HomeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default HomeProvider;
