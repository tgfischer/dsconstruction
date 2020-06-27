import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Row, Col, Card } from "react-bootstrap";

import { Spinner } from "components/Spinner";

export const LoginForm = ({
  values,
  isLoading,
  handleSubmit,
  handleChange
}) => (
  <Form onSubmit={handleSubmit}>
    <Row>
      <Col md={{ span: 6, offset: 3 }} sm={12}>
        <h2 className="mb-3">Login</h2>
        <Card>
          <Card.Body>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={values.email}
                disabled={isLoading}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="message">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={values.password}
                disabled={isLoading}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="d-flex align-items-center">
              <Button type="submit" disabled={isLoading}>
                Submit
              </Button>
              {isLoading && <Spinner className="ml-3" size="sm" />}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Form>
);

LoginForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  values: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};
