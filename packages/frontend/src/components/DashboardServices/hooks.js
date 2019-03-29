import React from "react";
import Button from "@material-ui/core/Button";

import useServices from "../../hooks/useServices";
import useModal from "../../hooks/useModal";
import ServiceDialog from "./ServiceDialog";

export const useDashboardServices = () => {
  const [rawServices, isLoading] = useServices();
  const { showModal: showAddModal, hideModal: hideAddModal } = useModal({
    content: (
      <ServiceDialog
        title="Add a service"
        submitButton={() => <Button onClick={hideAddModal}>Add</Button>}
        onCancel={() => hideAddModal()}
      />
    ),
    size: "xl"
  });
  const { showModal: showEditModal, hideModal: hideEditModal } = useModal({
    content: (
      <ServiceDialog
        title="Add a service"
        submitButton={() => <Button onClick={hideEditModal}>Add</Button>}
        onCancel={() => hideEditModal()}
      />
    ),
    size: "xl"
  });
  const services = rawServices.map(({ name, blurb }) => [name, blurb]);
  return [services, showAddModal, showEditModal, isLoading];
};
