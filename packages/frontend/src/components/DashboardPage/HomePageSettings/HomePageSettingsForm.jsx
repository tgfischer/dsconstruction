import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap-formik";
import { Card } from "react-bootstrap";
import { faSave } from "@fortawesome/free-solid-svg-icons";

import { FormSubmitButton } from "components/FormSubmitButton";
import { schema } from "./constants";

export const HomePageSettingsForm = ({
  isSubmitting,
  initialValues,
  onSubmit
}) => (
  <Form
    initialValues={initialValues}
    validationSchema={schema}
    onSubmit={onSubmit}
  >
    <Card className="mb-4">
      <Card.Header>Masthead</Card.Header>
      <Card.Body>
        <Form.Input name="header" label="Header" disabled={isSubmitting} />
        <Form.Input
          name="subHeader"
          label="Subheader"
          disabled={isSubmitting}
        />
      </Card.Body>
    </Card>
    <Card className="mb-4">
      <Card.Header>About section</Card.Header>
      <Card.Body>
        <Form.Textarea
          name="about"
          label="About"
          rows={6}
          disabled={isSubmitting}
        />
      </Card.Body>
    </Card>
    <Card className="mb-4">
      <Card.Header>Services section</Card.Header>
      <Card.Body>
        <Form.Input
          name="servicesHeader"
          label="Header"
          disabled={isSubmitting}
        />
        <Form.Input
          name="servicesSubHeader"
          label="Subheader"
          disabled={isSubmitting}
        />
      </Card.Body>
    </Card>
    <FormSubmitButton icon={faSave} isSubmitting={isSubmitting}>
      Save changes
    </FormSubmitButton>
  </Form>
);

HomePageSettingsForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  initialValues: PropTypes.shape({
    header: PropTypes.string.isRequired,
    subHeader: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired
  }).isRequired,
  onSubmit: PropTypes.func.isRequired
};
