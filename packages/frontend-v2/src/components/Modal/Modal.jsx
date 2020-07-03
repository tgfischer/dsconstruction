import React from "react";
import PropTypes from "prop-types";
import { Modal as BootstrapModal } from "react-bootstrap";

import { useModal } from "./hooks";

export const Modal = ({ isVisible, Title, Content, Footer }) => {
  const { hideModal } = useModal();
  return (
    <BootstrapModal show={isVisible} onHide={hideModal}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>
          <Title />
        </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Content onClose={hideModal} />
      </BootstrapModal.Body>
      {Footer && (
        <BootstrapModal.Footer>
          <Footer onClose={hideModal} />
        </BootstrapModal.Footer>
      )}
    </BootstrapModal>
  );
};

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  Title: PropTypes.func,
  Content: PropTypes.func,
  Footer: PropTypes.func
};

Modal.defaultProps = {
  Title: () => null,
  Content: () => null
};
