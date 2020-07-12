import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Form } from "react-bootstrap";

import { Modal } from "components/Modal";
import { useAddServiceForm } from "./hooks";
import { schema } from "./constants";

export const AddServiceForm = props => {
  const { isSubmitting, onSubmit } = useAddServiceForm(props);
  return (
    <Formik
      initialValues={{ name: "" }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ values, handleSubmit, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Service name</Form.Label>
            <Form.Control
              name="name"
              value={values.name}
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

AddServiceForm.propTypes = {
  onClose: PropTypes.func.isRequired
};
