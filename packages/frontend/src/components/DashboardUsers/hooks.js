import React, { useEffect } from "react";
import { useFormState } from "react-use-form-state";
import get from "lodash/get";

import { endpoints } from "../../constants";
import useModal from "../../hooks/useModal";
import useRequest from "../../hooks/useRequest";
import AddUserModal from "./AddUserModal";
import useUser from "../../hooks/useUser";

export const useUsers = () => {
  const { idToken } = useUser();
  const [{ data, isLoading }, getUsers] = useRequest(() => ({
    method: "GET",
    url: `${endpoints.users}/users`,
    headers: {
      Authorization: idToken
    }
  }));

  useEffect(() => void getUsers(), []);
  return [get(data, "users") || [], isLoading];
};

export const useDashboardUsers = () => {
  const [users, isLoading] = useUsers();
  const { idToken } = useUser();
  const [showAddModal, hideAddModal] = useModal(() => () => (
    <AddUserModal title="Add a user" onClose={hideAddModal} isOpen />
  ));
  const [{ isLoading: isDeleting }, handleDelete] = useRequest(
    data => ({
      method: "DELETE",
      url: `${endpoints.users}/users`,
      data,
      headers: {
        Authorization: idToken
      }
    }),
    () => window.location.reload()
  );
  return [
    users,
    showAddModal,
    ({ data }) => {
      handleDelete(data.map(({ index }) => users[index].id));
    },
    isLoading || isDeleting
  ];
};

export const useUserModal = onClose => {
  const [{ values }, input] = useFormState({});
  const { idToken } = useUser();
  const [submitResponse, handleSubmit] = useRequest(
    data => ({
      method: "POST",
      url: `${endpoints.users}/users`,
      data,
      headers: {
        Authorization: idToken
      }
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
