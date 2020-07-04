/* eslint-disable react/prop-types */

import React, { useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { useServices } from "components/HomePage";
import { useModal } from "components/Modal";
import { usePostRequest, useDeleteRequest } from "hooks/useRequest";
import { endpoints } from "constants/api";
import { AddServiceForm } from "./AddServiceForm";

export const useServicesSettings = () => {
  const { addToast } = useToasts();
  const { showModal } = useModal();
  const { services, isLoaded, fetchServices } = useServices();
  const [, handleAdd] = usePostRequest(
    {
      url: `${endpoints.backend}/services`
    },
    {
      onSuccess: useCallback(
        () => (
          addToast("Added the service successfully", {
            appearance: "success"
          }),
          fetchServices()
        ),
        [addToast, fetchServices]
      ),
      onError: useCallback(
        err =>
          addToast(`Failed to add the service: ${err.message}`, {
            appearance: "error"
          }),
        [addToast]
      )
    }
  );
  const [{ isLoading: isDeleting }, handleDelete] = useDeleteRequest(
    {
      url: `${endpoints.backend}/services`
    },
    {
      onSuccess: useCallback(
        () => (
          addToast("Deleted the service successfully", {
            appearance: "success"
          }),
          fetchServices()
        ),
        [addToast, fetchServices]
      ),
      onError: useCallback(
        err =>
          addToast(`Failed to delete the service: ${err.message}`, {
            appearance: "error"
          }),
        [addToast]
      )
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
        Content: props => <AddServiceForm {...props} onAdd={handleAdd} />
      });
    }
  };
};

export const useAddServiceForm = ({ onAdd, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return {
    isSubmitting,
    onSubmit: data => (
      setIsSubmitting(true),
      onAdd({ data })
        .then(() => (setIsSubmitting(false), onClose()))
        .catch(() => (setIsSubmitting(false), onClose()))
    )
  };
};
