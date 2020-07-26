import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap-formik";

import { Modal } from "components/Modal";
import { useAddUserForm } from "./hooks";
import { schema } from "./constants";

export const AddUserForm = props => {
  const [isSubmitting, handleSubmit] = useAddUserForm(props);
  return (
    <Form
      initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form.Input name="firstName" label="First name" disabled={isSubmitting} />
      <Form.Input name="lastName" label="Last name" disabled={isSubmitting} />
      <Form.Input name="email" label="Email" disabled={isSubmitting} />
      <Form.Input
        name="password"
        type="password"
        label="Temporary password"
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

AddUserForm.propTypes = {
  onClose: PropTypes.func.isRequired
};
