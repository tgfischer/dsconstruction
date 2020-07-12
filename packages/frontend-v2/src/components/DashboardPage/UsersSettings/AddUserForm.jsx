import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Form } from "react-bootstrap";

import { Modal } from "components/Modal";
import { useAddUserForm } from "./hooks";
import { schema } from "./constants";

export const AddUserForm = props => {
  const { isSubmitting, onSubmit } = useAddUserForm(props);
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ values, handleSubmit, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Temporary password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={values.password}
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

AddUserForm.propTypes = {
  onClose: PropTypes.func.isRequired
};
