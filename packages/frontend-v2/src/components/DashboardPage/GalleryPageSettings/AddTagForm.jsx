import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";

import { Spinner } from "components/Spinner";
import { useAddTagForm } from "./hooks";
import { schema } from "./constants";

export const AddTagForm = props => {
  const { isSubmitting, onSubmit } = useAddTagForm(props);
  return (
    <Formik
      initialValues={{ name: "" }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ values, handleSubmit, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Tag name</Form.Label>
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

AddTagForm.propTypes = {
  onClose: PropTypes.func.isRequired
};
