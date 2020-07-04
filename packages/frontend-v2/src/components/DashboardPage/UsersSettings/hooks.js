/* eslint-disable react/prop-types */

import React, { useEffect, useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { useModal } from "components/Modal";
import {
  useGetRequest,
  usePostRequest,
  useDeleteRequest
} from "hooks/useRequest";
import { useUser } from "hooks/useUser";
import { endpoints } from "constants/api";
import { AddUserForm } from "./AddUserForm";

export const useUsersSettings = () => {
  const { user } = useUser();
  const { addToast } = useToasts();
  const { showModal } = useModal();
  const [{ data, isLoaded }, fetchUsers] = useGetRequest(
    {
      url: `${endpoints.users}/users`
    },
    {
      onError: useCallback(
        err =>
          addToast(`Failed to fetch the users: ${err.message}`, {
            appearance: "error"
          }),
        [addToast]
      )
    }
  );
  const [, handleAdd] = usePostRequest(
    {
      url: `${endpoints.users}/users`
    },
    {
      onSuccess: useCallback(
        () => (
          addToast("Added the user successfully", {
            appearance: "success"
          }),
          fetchUsers()
        ),
        [addToast, fetchUsers]
      ),
      onError: useCallback(
        err =>
          addToast(`Failed to add the user: ${err.message}`, {
            appearance: "error"
          }),
        [addToast]
      )
    }
  );
  const [{ isLoading: isDeleting }, deleteUser] = useDeleteRequest(
    {
      url: `${endpoints.users}/users`
    },
    {
      onSuccess: useCallback(
        () => (
          addToast("Deleted the user successfully", {
            appearance: "success"
          }),
          fetchUsers()
        ),
        [addToast, fetchUsers]
      ),
      onError: useCallback(
        err =>
          addToast(`Failed to delete the user: ${err.message}`, {
            appearance: "error"
          }),
        [addToast]
      )
    }
  );
  useEffect(() => void fetchUsers(), [fetchUsers]);
  const handleDelete = ({ id, firstName, lastName }) =>
    showModal({
      Title: () => `Delete ${firstName} ${lastName}`,
      Content: ({ onClose }) => (
        <>
          <p>
            Are you sure you want to delete {firstName} {lastName}? You cannot
            undo this action
          </p>
          <div className="d-flex justify-content-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => (onClose(), deleteUser({ data: [id] }))}
            >
              Delete
            </Button>
          </div>
        </>
      )
    });
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
        Content: props => <AddUserForm {...props} onAdd={handleAdd} />
      });
    }
  };
};

export const useAddUserForm = ({ onAdd, onClose }) => {
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
