import { useContext } from "react";

import { ModalContext } from "./ModalProvider";

export const useModal = () => {
  const [, setState] = useContext(ModalContext);
  return {
    showModal: modal => setState({ modal: { ...modal, isVisible: true } }),
    hideModal: () =>
      setState({
        modal: { isVisible: false }
      })
  };
};
