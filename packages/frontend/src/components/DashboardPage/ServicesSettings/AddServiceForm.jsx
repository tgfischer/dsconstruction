import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap-formik";

import { Modal } from "components/Modal";
import { useAddServiceForm } from "./hooks";
import { schema } from "./constants";

export const AddServiceForm = props => {
  const [isSubmitting, handleSubmit] = useAddServiceForm(props);
  return (
    <Form
      initialValues={{ name: "" }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form.Input name="name" label="Service name" disabled={isSubmitting} />
      <Modal.Actions
        submitText="Add"
        isSubmitting={isSubmitting}
        onClose={props.onClose}
      />
    </Form>
  );
};

AddServiceForm.propTypes = {
  onClose: PropTypes.func.isRequired
};
