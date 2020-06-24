import React from "react";
import { Formik } from "formik";
import { Row, Col, Form, Button } from "react-bootstrap";

import { schema } from "./constants";

export const ContactForm = () => {
  return (
    <Formik validationSchema={schema}>
      {() => (
        <Form>
          <Row>
            <Form.Group as={Col} controlId="firstName">
              <Form.Label>First name</Form.Label>
              <Form.Control size="lg" required />
            </Form.Group>
            <Form.Group as={Col} controlId="lastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control size="lg" required />
            </Form.Group>
          </Row>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" size="lg" required />
          </Form.Group>
          <Form.Group controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" size="lg" rows={10} required />
          </Form.Group>
          <Button>Send message</Button>
        </Form>
      )}
    </Formik>
  );
};
