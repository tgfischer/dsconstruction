/* eslint-disable react/prop-types */

import React, { useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { useModal, DeleteModal } from "components/Modal";
import {
  useGetRequest,
  usePostRequest,
  useDeleteRequest
} from "hooks/useRequest";
import { useUser } from "hooks/useUser";
import { useSubmit } from "hooks/useSubmit";
import { endpoints } from "constants/api";
import { AddUserForm } from "./AddUserForm";

export const useUsersSettings = () => {
  const { user } = useUser();
  const { showModal } = useModal();
  const [{ data, isLoaded }, fetchUsers] = useGetRequest(
    {
      url: `${endpoints.users}/users`
    },
    {
      errorMessage: "Failed to fetch the users",
      useAuthorization: true
    }
  );
  const [, handleAdd] = usePostRequest(
    {
      url: `${endpoints.users}/users`
    },
    {
      successMessage: "Added the user successfully",
      errorMessage: "Failed to add the user",
      onSuccess: fetchUsers,
      useAuthorization: true
    }
  );
  const [{ isLoading: isDeleting }, deleteUser] = useDeleteRequest(
    {
      url: `${endpoints.users}/users`
    },
    {
      successMessage: "Deleted the user successfully",
      errorMessage: "Failed to delete the user",
      onSuccess: fetchUsers,
      useAuthorization: true
    }
  );
  const handleDelete = useCallback(
    ({ id, firstName, lastName }) => {
      const message = `Are you sure you want to delete ${firstName} ${lastName}? You cannot undo this action`;
      return showModal({
        Title: () => `Delete ${firstName} ${lastName}`,
        Content: props => (
          <DeleteModal
            {...props}
            message={message}
            onDelete={() => deleteUser({ data: [id] })}
          />
        )
      });
    },
    [deleteUser, showModal]
  );

  useEffect(() => void fetchUsers(), [fetchUsers]);

  return {
    isLoaded,
    columns: {
      name: {
        Header: () => "Name",
        Cell: ({ row }) => (
          <span>
            {row.firstName} {row.lastName}
          </span>
        )
      },
      email: {
        Header: () => "Email",
        Cell: ({ row }) => <span>{row.email}</span>
      },
      status: {
        Header: () => "Status",
        Cell: ({ row }) => <span>{row.status}</span>
      },
      remove: {
        Header: () => null,
        Cell: ({ row }) => (
          <Button
            variant="danger"
            onClick={() => handleDelete(row)}
            disabled={isDeleting || row.email === user.email}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        ),
        cellProps: {
          className: "d-flex justify-content-center"
        }
      }
    },
    rows: data?.users ?? [],
    handleAdd: () => {
      showModal({
        Title: () => "Add user",
        Content: props => <AddUserForm {...props} onSubmit={handleAdd} />
      });
    }
  };
};

export const useAddUserForm = ({ onSubmit, onClose }) =>
  useSubmit({
    handleSubmit: data => onSubmit({ data }),
    handleFinish: onClose
  });
