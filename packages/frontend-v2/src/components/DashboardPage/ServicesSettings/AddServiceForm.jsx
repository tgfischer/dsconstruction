import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";

import { Spinner } from "components/Spinner";
import { useAddServiceForm } from "./hooks";

export const AddServiceForm = props => {
  const { isSubmitting, onSubmit } = useAddServiceForm(props);
  return (
    <Formik initialValues={{ name: "" }} onSubmit={onSubmit}>
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
          <div className="d-flex justify-content-end">
            {isSubmitting && (
              <Spinner className="ml-3 align-items-center" size="sm" />
            )}
            <Button variant="outline" onClick={props.onClose}>
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

AddServiceForm.propTypes = {
  onClose: PropTypes.func.isRequired
};
