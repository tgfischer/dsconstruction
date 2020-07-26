import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap-formik";
import { Card } from "react-bootstrap";
import { faSave } from "@fortawesome/free-solid-svg-icons";

import { FormSubmitButton } from "components/FormSubmitButton";
import { contactSettingsSchema } from "./constants";

export const ContactPageSettingsForm = ({
  isSubmitting,
  initialValues,
  onSubmit
}) => (
  <Form
    className="mb-4"
    initialValues={initialValues}
    validationSchema={contactSettingsSchema}
    onSubmit={onSubmit}
  >
    <Card className="mb-4">
      <Card.Header>Company address</Card.Header>
      <Card.Body>
        <Form.Input name="street" label="Street" disabled={isSubmitting} />
        <Form.Input name="city" label="City" disabled={isSubmitting} />
        <Form.Input name="province" label="Province" disabled={isSubmitting} />
        <Form.Input
          name="postalCode"
          label="Postal code"
          disabled={isSubmitting}
        />
      </Card.Body>
    </Card>
    <Card className="mb-4">
      <Card.Header>Company email</Card.Header>
      <Card.Body>
        <Form.Input
          name="email"
          label="Email"
          disabled={isSubmitting}
          helpText="Note: Emails sent from the contact page will be sent to this address"
        />
      </Card.Body>
    </Card>
    <FormSubmitButton icon={faSave} isSubmitting={isSubmitting}>
      Save changes
    </FormSubmitButton>
  </Form>
);

ContactPageSettingsForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  initialValues: PropTypes.shape({
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
  onSubmit: PropTypes.func.isRequired
};
