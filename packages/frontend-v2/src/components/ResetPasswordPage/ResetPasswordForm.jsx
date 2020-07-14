import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

import { IconAlert } from "components/IconAlert";
import { Spinner } from "components/Spinner";

export const ResetPasswordForm = ({
  values,
  isLoading,
  isValid,
  handleSubmit,
  handleChange
}) => (
  <Form onSubmit={handleSubmit}>
    <Row>
      <Col md={{ span: 6, offset: 3 }} sm={12}>
        <h2 className="mb-3">Reset Password</h2>
        <Card>
          <Card.Body>
            <Form.Group controlId="password">
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
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                disabled={isLoading}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <IconAlert icon={faInfo} variant="light">
              The new password must be at least 8 characters long, and contain
              at least one uppercase character, one lowercase character, one
              number, and one special character
            </IconAlert>
            <div className="d-flex justify-content-end align-items-center">
              <Button type="submit" disabled={isLoading || !isValid}>
                Reset password
              </Button>
              {isLoading && <Spinner className="ml-3" size="sm" />}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Form>
);

ResetPasswordForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  values: PropTypes.shape({
    password: PropTypes.string,
    confirmPassword: PropTypes.string
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};
