import React, { useCallback } from "react";
import { useToasts } from "react-toast-notifications";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

import { usePostRequest } from "hooks/useRequest";
import { useContactPage } from "components/ContactPage";
import { useModal } from "components/Modal";
import { IconButton } from "components/IconButton";
import { endpoints } from "constants/api";
import { AddPhoneNumberForm } from "./AddPhoneNumberForm";

export const useContactPageSettings = () => {
  const { addToast } = useToasts();
  const { contact, isLoaded } = useContactPage();
  const [{ isLoading: isSubmitting }, handleSubmit] = usePostRequest(
    {
      url: `${endpoints.backend}/contact/contact`
    },
    {
      onSuccess: useCallback(
        () =>
          addToast("Saved the settings successfully", {
            appearance: "success"
          }),
        [addToast]
      ),
      onError: useCallback(
        err =>
          addToast(`Failed to save the settings: ${err.message}`, {
            appearance: "error"
          }),
        [addToast]
      )
    }
  );
  return {
    isLoaded,
    isSubmitting,
    phoneNumbers: contact.phoneNumbers,
    initialValues: {
      ...contact.address,
      email: contact.email
    },
    onSubmit: ({ street, city, province, postalCode, email }) => {
      handleSubmit({
        data: {
          address: {
            street,
            city,
            province,
            postalCode
          },
          email
        }
      });
    }
  };
};

export const usePhoneNumbersTable = ({ phoneNumbers }) => {
  const { showModal } = useModal();
  return {
    columns: {
      name: {
        Header: () => <span>Name</span>,
        // eslint-disable-next-line react/prop-types
        Cell: ({ name }) => <span>{name}</span>
      },
      number: {
        Header: () => <span>Phone number</span>,
        // eslint-disable-next-line react/prop-types
        Cell: ({ number }) => <span>{number}</span>
      },
      remove: {
        Header: () => null,
        Cell: () => (
          <Button variant="danger">
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        ),
        cellProps: {
          className: "d-flex justify-content-center"
        }
      }
    },
    rows: phoneNumbers ?? [],
    handleAdd: () => {
      showModal({
        Title: () => "Add phone number",
        // eslint-disable-next-line react/prop-types
        Content: ({ onClose }) => <AddPhoneNumberForm onSubmit={onClose} />,
        // eslint-disable-next-line react/prop-types
        Footer: ({ onClose }) => (
          <>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <IconButton icon={faPlus} onClick={onClose}>
              Add phone number
            </IconButton>
          </>
        )
      });
    }
  };
};
