import React, { useContext } from "react";
import { useFormState } from "react-use-form-state";
import { useSnackbar } from "notistack";
import pullAt from "lodash/pullAt";

import { ContactContext } from "../../contexts/ContactProvider";
import useModal from "../../hooks/useModal";
import AddPhoneNumberModal from "./AddPhoneNumberModal";
import useRequest from "../../hooks/useRequest";
import { endpoints } from "../../constants";
import useUser from "../../hooks/useUser";

export const useDashboardContacts = () => {
  const { idToken } = useUser();
  const [state] = useContext(ContactContext);
  const { enqueueSnackbar } = useSnackbar();
  const [{ isLoading: isSubmitting }, handleSubmit] = useRequest(
    ({ isLoading, ...data }) => ({
      method: "POST",
      url: `${endpoints.backend}/contact/edit`,
      data,
      headers: {
        Authorization: idToken
      }
    }),
    () =>
      enqueueSnackbar("Successfully updated the settings", {
        variant: "success",
        preventDuplicate: true
      })
  );
  return [state, handleSubmit, state.isLoading || isSubmitting];
};

export const usePhoneNumbers = () => {
  const [state, setState] = useContext(ContactContext);
  const [showModal, hideModal] = useModal(() => () => (
    <AddPhoneNumberModal
      title="Add a phone number"
      phoneNumbers={() => state.phoneNumbers}
      onSubmit={phoneNumbers => {
        setState({
          ...state,
          phoneNumbers
        });
        hideModal();
      }}
      onClose={hideModal}
      isOpen
    />
  ));
  return [
    state.phoneNumbers,
    showModal,
    ({ data }) => {
      pullAt(state.phoneNumbers, data.map(({ index }) => index));
      setState({
        ...state,
        phoneNumbers: state.phoneNumbers
      });
    },
    state.isLoading
  ];
};

export const useAddPhoneNumberModal = (getPhoneNumbers, onSubmit) => {
  const [{ values }, input] = useFormState({});
  return [
    e => {
      e.preventDefault();
      onSubmit([...getPhoneNumbers(), values]);
    },
    input
  ];
};

export const useAddress = () => {
  const [state, setState] = useContext(ContactContext);
  return [
    state.address,
    key => e =>
      setState({
        ...state,
        address: {
          ...state.address,
          [key]: e.target.value
        }
      }),
    state.isLoading
  ];
};

export const useEmail = () => {
  const [state, setState] = useContext(ContactContext);
  return [
    state.email,
    e =>
      setState({
        ...state,
        email: e.target.value
      }),
    state.isLoading
  ];
};
