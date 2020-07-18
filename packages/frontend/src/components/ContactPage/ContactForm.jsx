import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Form } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { FormSubmitButton } from "components/FormSubmitButton";
import { useContactPageForm } from "./hooks";

export const ContactForm = ({
  values,
  isSubmitting,
  isValid,
  handleChange,
  handleSubmit
}) => {
  const { handleReCaptcha } = useContactPageForm();
  return (
    <Form className="mb-3" onSubmit={handleSubmit}>
      <Row>
        <Form.Group as={Col} controlId="firstName" sm={6} xs={12}>
          <Form.Label>First name</Form.Label>
          <Form.Control
            name="firstName"
            size="lg"
            value={values.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="lastName" sm={6} xs={12}>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            name="lastName"
            size="lg"
            value={values.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Row>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          type="email"
          size="lg"
          value={values.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="message">
        <Form.Label>Message</Form.Label>
        <Form.Control
          name="message"
          as="textarea"
          size="lg"
          rows={10}
          value={values.message}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <ReCAPTCHA
        className="mb-3"
        sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
        onChange={handleReCaptcha}
      />
      <FormSubmitButton icon={faPaperPlane} isSubmitting={isSubmitting}>
        Send message
      </FormSubmitButton>
    </Form>
  );
};

ContactForm.propTypes = {
  values: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};
