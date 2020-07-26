import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap-formik";

import { Modal } from "components/Modal";
import { useAddTagForm } from "./hooks";
import { schema } from "./constants";

export const AddTagForm = props => {
  const [isSubmitting, handleSubmit] = useAddTagForm(props);
  return (
    <Form
      initialValues={{ name: "" }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form.Input name="name" label="Category name" disabled={isSubmitting} />
      <Modal.Actions
        submitText="Add"
        isSubmitting={isSubmitting}
        onClose={props.onClose}
      />
    </Form>
  );
};

AddTagForm.propTypes = {
  onClose: PropTypes.func.isRequired
};
