import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Form } from "react-bootstrap";

import { Modal } from "components/Modal";
import { useAddPhoneNumberForm } from "./hooks";
import { schema } from "./constants";

export const AddPhoneNumberForm = props => {
  const { isSubmitting, onSubmit } = useAddPhoneNumberForm(props);
  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ values, handleSubmit, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={values.name}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </Form.Group>
          <Form.Group controlId="number">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              name="number"
              type="number"
              value={values.number}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </Form.Group>
          <Modal.Actions
            submitText="Add"
            isSubmitting={isSubmitting}
            onClose={props.onClose}
          />
        </Form>
      )}
    </Formik>
  );
};

AddPhoneNumberForm.propTypes = {
  onClose: PropTypes.func.isRequired
};
