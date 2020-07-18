import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Form, Card } from "react-bootstrap";
import { faSave } from "@fortawesome/free-solid-svg-icons";

import { FormSubmitButton } from "components/FormSubmitButton";

export const ContactPageSettingsForm = ({
  isSubmitting,
  initialValues,
  onSubmit
}) => (
  <Formik initialValues={initialValues} onSubmit={onSubmit}>
    {({ values, handleSubmit, handleChange }) => (
      <Form className="mb-4" onSubmit={handleSubmit}>
        <Card className="mb-4">
          <Card.Header>Company address</Card.Header>
          <Card.Body>
            <Form.Group controlId="street">
              <Form.Label>Street</Form.Label>
              <Form.Control
                name="street"
                value={values.street}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                value={values.city}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </Form.Group>
            <Form.Group controlId="province">
              <Form.Label>Province</Form.Label>
              <Form.Control
                name="province"
                value={values.province}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </Form.Group>
            <Form.Group controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                name="postalCode"
                value={values.postalCode}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </Form.Group>
          </Card.Body>
        </Card>
        <Card className="mb-4">
          <Card.Header>Company email</Card.Header>
          <Card.Body>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                disabled={isSubmitting}
                rows={6}
                required
              />
              <Form.Text>
                Note: Emails sent from the contact page will be sent to this
                address
              </Form.Text>
            </Form.Group>
          </Card.Body>
        </Card>
        <FormSubmitButton icon={faSave} isSubmitting={isSubmitting}>
          Save changes
        </FormSubmitButton>
      </Form>
    )}
  </Formik>
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
