import React, { useState } from "react";
import PropTypes from "prop-types";

export const DashboardServicesContext = React.createContext();

const DashboardServicesProvider = ({ children }) => (
  <DashboardServicesContext.Provider value={useState({ files: [] })}>
    {children}
  </DashboardServicesContext.Provider>
);

DashboardServicesProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default DashboardServicesProvider;
