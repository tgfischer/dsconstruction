import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useFormState } from "react-use-form-state";
import { useResource } from "react-request-hook";

import { endpoints } from "../../constants";
import useServices from "../../hooks/useServices";
import useModal from "../../hooks/useModal";
import AddDialog from "./AddDialog";
import EditDialog from "./EditDialog";

export const useDashboardServices = () => {
  const [services, isLoading] = useServices();
  const [showAddModal, hideAddModal] = useModal(() => () => (
    <AddDialog
      title="Add a service"
      onClose={hideAddModal}
      submitButton={() => <Button onClick={hideAddModal}>Add</Button>}
      isOpen
    />
  ));
  const [showEditModal, hideEditModal] = useModal(service => () => (
    <EditDialog
      title="Edit service"
      service={service}
      onClose={hideEditModal}
      submitButton={() => <Button onClick={hideEditModal}>Save</Button>}
      isOpen
    />
  ));
  const [{ data }, handleDelete] = useResource(data => ({
    method: "DELETE",
    url: `${endpoints.backend}/services`,
    data
  }));
  useEffect(() => {
    if (data) {
      window.location.reload();
    }
  }, [data]);
  return [
    services,
    showAddModal,
    row =>
      showEditModal({
        id: row[0],
        name: row[1],
        blurb: row[2],
        description: row[3],
        thumbnail: row[4],
        to: row[5]
      }),
    ({ data }) => {
      handleDelete(data.map(({ index }) => services[index].id));
    },
    isLoading
  ];
};

export const useServiceDialog = (url, initialState, onClose) => {
  const [{ values }, input] = useFormState(initialState);
  const [{ data, isLoading }, handleSubmit] = useResource(data => ({
    method: "POST",
    url: `${endpoints.backend}${url}`,
    data
  }));
  useEffect(() => {
    if (data) {
      window.location.reload();
      onClose();
    }
  }, [data]);
  return [
    e => {
      e.preventDefault();
      handleSubmit(values);
    },
    values,
    input,
    isLoading
  ];
};
