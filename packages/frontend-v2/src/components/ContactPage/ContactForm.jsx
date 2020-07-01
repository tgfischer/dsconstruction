import React from "react";
import { Formik } from "formik";
import { Row, Col, Form, Button } from "react-bootstrap";

import { schema } from "./constants";

export const ContactForm = () => {
  return (
    <Formik
      validationSchema={schema}
      initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
    >
      {({ handleSubmit, handleChange }) => (
        <Form className="mb-3" onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} controlId="firstName" sm={6} xs={12}>
              <Form.Label>First name</Form.Label>
              <Form.Control
                name="lastName"
                size="lg"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="lastName" sm={6} xs={12}>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                name="firstName"
                size="lg"
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
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type="submit">Send message</Button>
        </Form>
      )}
    </Formik>
  );
};
