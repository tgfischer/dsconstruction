import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

export const ModalContext = React.createContext();

export const ModalProvider = ({ children }) => (
  <ModalContext.Provider value={useState({ isOpen: false, content: <span /> })}>
    {children}
  </ModalContext.Provider>
);

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default (options = { content: <span /> }) => {
  const [modal, setState] = useContext(ModalContext);
  return {
    isOpen: modal.isOpen,
    size: modal.size,
    content: modal.content,
    showModal: () => setState({ isOpen: true, content: options.content }),
    hideModal: () => setState({ isOpen: false, content: <span /> })
  };
};
