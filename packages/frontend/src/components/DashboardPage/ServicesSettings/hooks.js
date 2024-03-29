/* eslint-disable react/prop-types */

import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { useServices } from "components/HomePage";
import { useModal } from "components/Modal";
import { usePostRequest, useDeleteRequest } from "hooks/useRequest";
import { useSubmit } from "hooks/useSubmit";
import { endpoints } from "constants/api";
import { AddServiceForm } from "./AddServiceForm";

export const useServicesSettings = () => {
  const { showModal } = useModal();
  const { services, isLoaded, fetchServices } = useServices();
  const [, handleAdd] = usePostRequest(
    {
      url: `${endpoints.backend}/services`
    },
    {
      successMessage: "Added the service successfully",
      errorMessage: "Failed to add the service",
      onSuccess: fetchServices,
      useAuthorization: true
    }
  );
  const [{ isLoading: isDeleting }, handleDelete] = useDeleteRequest(
    {
      url: `${endpoints.backend}/services`
    },
    {
      successMessage: "Deleted the service successfully",
      errorMessage: "Failed to delete the service",
      onSuccess: fetchServices,
      useAuthorization: true
    }
  );
  return {
    isLoaded,
    columns: {
      service: {
        Header: () => "Service name",
        Cell: ({ row }) => <span>{row.name}</span>
      },
      remove: {
        Header: () => null,
        Cell: ({ row }) => (
          <Button
            variant="danger"
            onClick={() => handleDelete({ data: [row.id] })}
            disabled={isDeleting}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        ),
        cellProps: {
          className: "d-flex justify-content-center"
        }
      }
    },
    rows: services,
    handleAdd: () => {
      showModal({
        Title: () => "Add service",
        Content: props => <AddServiceForm {...props} onSubmit={handleAdd} />
      });
    }
  };
};

export const useAddServiceForm = ({ onSubmit, onClose }) =>
  useSubmit({
    handleSubmit: data => onSubmit({ data }),
    handleFinish: onClose
  });
