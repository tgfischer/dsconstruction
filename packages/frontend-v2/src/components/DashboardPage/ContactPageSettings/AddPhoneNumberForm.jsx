import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Form } from "react-bootstrap";

export const AddPhoneNumberForm = ({ onSubmit }) => (
  <Formik initialValues={{ name: "", number: "" }} onSubmit={onSubmit}>
    {({ values, handleSubmit, handleChange }) => (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={values.name}
            onChange={handleChange}
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
            required
          />
        </Form.Group>
      </Form>
    )}
  </Formik>
);

AddPhoneNumberForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
