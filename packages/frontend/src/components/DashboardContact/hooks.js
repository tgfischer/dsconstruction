import React, { useContext } from "react";
import { useFormState } from "react-use-form-state";
import pullAt from "lodash/pullAt";

import { ContactContext } from "../../contexts/ContactProvider";
import useModal from "../../hooks/useModal";
import AddPhoneNumberModal from "./AddPhoneNumberModal";

export const usePhoneNumbers = () => {
  const [state, setState] = useContext(ContactContext);
  const [showModal, hideModal] = useModal(() => () => (
    <AddPhoneNumberModal
      title="Add a phone number"
      phoneNumbers={state.phoneNumbers}
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

export const useAddPhoneNumberModal = (phoneNumbers, onSubmit) => {
  const [{ values }, input] = useFormState({});
  return [
    e => {
      e.preventDefault();
      onSubmit([...phoneNumbers, values]);
    },
    input
  ];
};
