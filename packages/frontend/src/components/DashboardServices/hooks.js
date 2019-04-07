import React from "react";
import { useFormState } from "react-use-form-state";

import { endpoints } from "../../constants";
import useServices from "../../hooks/useServices";
import useModal from "../../hooks/useModal";
import useRequest from "../../hooks/useRequest";
import DashboardServicesModal from "./DashboardServicesModal";

export const useDashboardServices = () => {
  const [services, isLoading] = useServices();
  const [showAddModal, hideAddModal] = useModal(() => () => (
    <DashboardServicesModal
      title="Add a service"
      onClose={hideAddModal}
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

export const useServiceModal = onClose => {
  const [{ values }, input] = useFormState({});
  const [submitResponse, handleSubmit] = useRequest(
    data => ({
      method: "POST",
      url: `${endpoints.backend}/services/`,
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
