/* eslint-disable react/prop-types */

import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PhoneNumber from "awesome-phonenumber";
import { reject } from "lodash";

import { usePostRequest } from "hooks/useRequest";
import { useSubmit } from "hooks/useSubmit";
import { useContactPage } from "components/ContactPage";
import { useModal } from "components/Modal";
import { endpoints } from "constants/api";
import { AddPhoneNumberForm } from "./AddPhoneNumberForm";

export const useContactPageSettings = () => {
  const { contact, isLoaded, fetchContact } = useContactPage();
  const [{ isLoading: isSubmitting }, handleSubmit] = usePostRequest(
    {
      url: `${endpoints.backend}/contact/contact`
    },
    {
      successMessage: "Saved the settings successfully",
      errorMessage: "Failed to save the settings",
      useAuthorization: true
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
  const rows = phoneNumbers ?? [];
  const [{ isLoading: isSubmitting }, handleUpdate] = usePostRequest(
    {
      url: `${endpoints.backend}/contact/phone_numbers`
    },
    {
      successMessage: "Saved the phone numbers successfully",
      errorMessage: "Failed to save the phone numbers",
      onSuccess: fetchContact,
      useAuthorization: true
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
        Cell: ({ row }) => <span>{row.name}</span>
      },
      number: {
        Header: () => <span>Phone number</span>,
        Cell: ({ row }) => (
          <span>
            {new PhoneNumber(row.number.toString(), "CA").getNumber("national")}
          </span>
        )
      },
      remove: {
        Header: () => null,
        Cell: ({ row }) => (
          <Button variant="danger" onClick={handleDelete(row.number)}>
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
}) =>
  useSubmit({
    handleSubmit: ({ name, number }) =>
      onUpdate({
        data: { phoneNumbers: [...phoneNumbers, { name, number }] }
      }),
    handleFinish: onClose
  });
