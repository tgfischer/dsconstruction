import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { useFormState } from "react-use-form-state";

import { endpoints } from "../../constants";
import useServices from "../../hooks/useServices";
import useModal from "../../hooks/useModal";
import useRequest from "../../hooks/useRequest";
import useBulkUpload from "../../hooks/useBulkUpload";
import DashboardServicesProvider, { DashboardServicesContext } from "./context";
import AddDialog from "./AddDialog";
import EditDialog from "./EditDialog";

export const useDashboardServices = () => {
  const [services, isLoading] = useServices();
  const [showAddModal, hideAddModal] = useModal(() => () => (
    <DashboardServicesProvider>
      <AddDialog
        title="Add a service"
        onClose={hideAddModal}
        submitButton={() => <Button onClick={hideAddModal}>Add</Button>}
        isOpen
      />
    </DashboardServicesProvider>
  ));
  const [showEditModal, hideEditModal] = useModal(service => () => (
    <DashboardServicesProvider>
      <EditDialog
        title="Edit service"
        service={service}
        onClose={hideEditModal}
        submitButton={() => <Button onClick={hideEditModal}>Save</Button>}
        isOpen
      />
    </DashboardServicesProvider>
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

export const useServiceDialog = (url, initialState, requiresPhoto, onClose) => {
  const [{ values }, input] = useFormState(initialState);
  const [{ files }] = useContext(DashboardServicesContext);
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
  const [, handleBulkUpload, , isUploading] = useBulkUpload(
    `${endpoints.photos}/upload`,
    "services",
    files,
    data =>
      handleSubmit({ ...values, thumbnail: "/services/" + data[0].file.name })
  );

  return [
    e => {
      e.preventDefault();
      return !requiresPhoto && files.length === 0
        ? handleSubmit(values)
        : handleBulkUpload({
            files: files.map(({ name }) => "services/" + name)
          });
    },
    values,
    input,
    Boolean(submitResponse.isLoading || isUploading)
  ];
};

export const useServicesDropzone = () => {
  const [{ files }, setState] = useContext(DashboardServicesContext);
  return [files, files => setState({ files })];
};
