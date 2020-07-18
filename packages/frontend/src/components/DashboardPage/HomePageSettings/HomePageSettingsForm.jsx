import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Form, Card } from "react-bootstrap";
import { faSave } from "@fortawesome/free-solid-svg-icons";

import { FormSubmitButton } from "components/FormSubmitButton";

export const HomePageSettingsForm = ({
  isSubmitting,
  initialValues,
  onSubmit
}) => (
  <Formik initialValues={initialValues} onSubmit={onSubmit}>
    {({ values, handleSubmit, handleChange }) => (
      <Form onSubmit={handleSubmit}>
        <Card className="mb-4">
          <Card.Body>
            <Form.Group controlId="header">
              <Form.Label>Header</Form.Label>
              <Form.Control
                name="header"
                value={values.header}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </Form.Group>
            <Form.Group controlId="subHeader">
              <Form.Label>Sub Header</Form.Label>
              <Form.Control
                name="subHeader"
                value={values.subHeader}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </Form.Group>
          </Card.Body>
        </Card>
        <Card className="mb-4">
          <Card.Body>
            <Form.Group controlId="about">
              <Form.Label>About</Form.Label>
              <Form.Control
                name="about"
                as="textarea"
                value={values.about}
                onChange={handleChange}
                disabled={isSubmitting}
                rows={6}
                required
              />
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

HomePageSettingsForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  initialValues: PropTypes.shape({
    header: PropTypes.string.isRequired,
    subHeader: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired
  }).isRequired,
  onSubmit: PropTypes.func.isRequired
};
