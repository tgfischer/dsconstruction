import React from "react";
import Button from "@material-ui/core/Button";
import { useFormState } from "react-use-form-state";

import { endpoints } from "../../constants";
import useServices from "../../hooks/useServices";
import useModal from "../../hooks/useModal";
import useRequest from "../../hooks/useRequest";
import DashboardServicesDialog from "./DashboardServicesDialog";

export const useDashboardServices = () => {
  const [services, isLoading] = useServices();
  const [showAddModal, hideAddModal] = useModal(() => () => (
    <DashboardServicesDialog
      title="Add a service"
      onClose={hideAddModal}
      submitButton={() => <Button onClick={hideAddModal}>Add</Button>}
      isOpen
    />
  ));
  const [, handleDelete] = useRequest(
    data => ({
      method: "DELETE",
      url: `${endpoints.backend}/services`,
      data
    }),
    () => window.location.reload()
  );
  return [
    services,
    showAddModal,
    ({ data }) => {
      handleDelete(data.map(({ index }) => services[index].id));
    },
    isLoading
  ];
};

export const useServiceDialog = (url, initialState, requiresPhoto, onClose) => {
  const [{ values }, input] = useFormState(initialState);
  const [submitResponse, handleSubmit] = useRequest(
    data => ({
      method: "POST",
      url: `${endpoints.backend}${url}`,
      data
    }),
    () => {
      window.location.reload();
      onClose();
    }
  );

  return [
    e => {
      e.preventDefault();
      handleSubmit(values);
    },
    input,
    Boolean(submitResponse.isLoading)
  ];
};
