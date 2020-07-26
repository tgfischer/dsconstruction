import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap-formik";

import { FormSubmitButton } from "components/FormSubmitButton";
import { useContactPageForm } from "./hooks";

export const ContactForm = ({ isSubmitting }) => {
  const { handleReCaptcha } = useContactPageForm();
  return (
    <>
      <Row>
        <Col sm={6} xs={12}>
          <Form.Input name="firstName" label="First name" size="lg" />
        </Col>
        <Col sm={6} xs={12}>
          <Form.Input name="lastName" label="Last name" size="lg" />
        </Col>
      </Row>
      <Form.Input name="email" label="Email" size="lg" />
      <Form.Textarea name="message" label="Message" size="lg" rows={10} />
      <ReCAPTCHA
        className="mb-3"
        sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
        onChange={handleReCaptcha}
      />
      <FormSubmitButton icon={faPaperPlane} isSubmitting={isSubmitting}>
        Send message
      </FormSubmitButton>
    </>
  );
};

ContactForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired
};
