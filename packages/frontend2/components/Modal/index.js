import React from "react";
import Dialog from "@material-ui/core/Dialog";

import useModal from "../../hooks/useModal";

const Modal = () => {
  const { isOpen, size = "md", content, hideModal } = useModal();
  return (
    <Dialog open={isOpen} maxWidth={size} onClose={hideModal}>
      {content}
    </Dialog>
  );
};

export default Modal;
