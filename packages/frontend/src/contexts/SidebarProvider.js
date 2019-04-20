import React, { useState } from "react";
import PropTypes from "prop-types";

export const SidebarContext = React.createContext();

const SidebarProvider = ({ children }) => (
  <SidebarContext.Provider value={useState(false)}>
    {children}
  </SidebarContext.Provider>
);

SidebarProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default SidebarProvider;
