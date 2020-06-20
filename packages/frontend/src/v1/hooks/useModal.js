import { useState, useMemo, useCallback } from "react";
import { useModal } from "react-modal-hook";

export default modalFactory => {
  const [modalData, setModalData] = useState(undefined);
  const modalComponent = useMemo(() => modalFactory(modalData), [modalData]);
  const [_showModal, hideModal] = useModal(modalComponent, [modalData]);

  const showModal = useCallback(data => {
    setModalData(data);
    _showModal();
  });

  return [showModal, hideModal];
};
