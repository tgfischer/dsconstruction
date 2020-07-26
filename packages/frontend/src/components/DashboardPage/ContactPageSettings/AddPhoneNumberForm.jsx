import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap-formik";

import { Modal } from "components/Modal";
import { useAddPhoneNumberForm } from "./hooks";
import { addNumberSchema } from "./constants";

export const AddPhoneNumberForm = props => {
  const [isSubmitting, handleSubmit] = useAddPhoneNumberForm(props);
  return (
    <Form
      initialValues={{ name: "", number: "" }}
      validationSchema={addNumberSchema}
      onSubmit={handleSubmit}
    >
      <Form.Input name="name" label="Full name" disabled={isSubmitting} />
      <Form.Input
        type="number"
        name="number"
        label="Phone number"
        disabled={isSubmitting}
      />
      <Modal.Actions
        submitText="Add"
        isSubmitting={isSubmitting}
        onClose={props.onClose}
      />
    </Form>
  );
};

AddPhoneNumberForm.propTypes = {
  onClose: PropTypes.func.isRequired
};
