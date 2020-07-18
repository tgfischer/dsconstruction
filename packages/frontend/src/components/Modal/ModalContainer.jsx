import React, { useContext } from "react";
import PropTypes from "prop-types";

import { ModalContext } from "./ModalProvider";
import { Modal } from "./Modal";

export const ModalContainer = ({ children }) => {
  const [{ modal }] = useContext(ModalContext);
  return (
    <>
      {children}
      <Modal {...modal} />
    </>
  );
};

ModalContainer.propTypes = {
  children: PropTypes.node.isRequired
};
