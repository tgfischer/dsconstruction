import React, { useCallback, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { usePostRequest } from "hooks/useRequest";
import { useContactPage } from "components/ContactPage";
import { useModal } from "components/Modal";
import { endpoints } from "constants/api";
import { AddPhoneNumberForm } from "./AddPhoneNumberForm";
import { reject } from "lodash";

export const useContactPageSettings = () => {
  const { addToast } = useToasts();
  const { contact, isLoaded, fetchContact } = useContactPage();
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
    fetchContact,
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

export const usePhoneNumbersTable = ({ phoneNumbers, fetchContact }) => {
  const { showModal } = useModal();
  const { addToast } = useToasts();
  const rows = phoneNumbers ?? [];
  const [{ isLoading: isSubmitting }, handleUpdate] = usePostRequest(
    {
      url: `${endpoints.backend}/contact/phone_numbers`
    },
    {
      onSuccess: useCallback(
        () => (
          addToast("Saved the updated phone numbers successfully", {
            appearance: "success"
          }),
          fetchContact()
        ),
        [addToast, fetchContact]
      ),
      onError: useCallback(
        err =>
          addToast(`Failed to save the updated phone numbers: ${err.message}`, {
            appearance: "error"
          }),
        [addToast]
      )
    }
  );
  const handleDelete = number => () =>
    handleUpdate({
      data: {
        phoneNumbers: reject(rows, phoneNumber => phoneNumber.number === number)
      }
    });

  return {
    isSubmitting,
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
        // eslint-disable-next-line react/prop-types
        Cell: ({ number }) => (
          <Button variant="danger" onClick={handleDelete(number)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        ),
        cellProps: {
          className: "d-flex justify-content-center"
        }
      }
    },
    rows,
    handleAdd: () => {
      showModal({
        Title: () => "Add phone number",
        Content: props => (
          <AddPhoneNumberForm
            {...props}
            phoneNumbers={phoneNumbers}
            onUpdate={handleUpdate}
          />
        )
      });
    }
  };
};

export const useAddPhoneNumberForm = ({
  phoneNumbers = [],
  onUpdate,
  onClose
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return {
    isSubmitting,
    onSubmit: ({ name, number }) => (
      setIsSubmitting(true),
      onUpdate({
        data: { phoneNumbers: [...phoneNumbers, { name, number }] }
      })
        .then(() => (setIsSubmitting(false), onClose()))
        .catch(() => (setIsSubmitting(false), onClose()))
    )
  };
};
