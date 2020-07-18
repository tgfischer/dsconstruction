import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

import { ModalContainer } from "./ModalContainer";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => (
  <ModalContext.Provider value={useState({ modal: { isVisible: false } })}>
    <ModalContainer>{children}</ModalContainer>
  </ModalContext.Provider>
);

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired
};
