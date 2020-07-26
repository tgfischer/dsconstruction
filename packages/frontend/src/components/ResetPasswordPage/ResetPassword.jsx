import React from "react";
import { Form } from "react-bootstrap-formik";
import { Button, Row, Col, Card } from "react-bootstrap";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

import { Page } from "components/Page";
import { IconAlert } from "components/IconAlert";
import { Spinner } from "components/Spinner";
import { schema } from "./constants";
import { useResetPassword } from "./hooks";

const ResetPassword = () => {
  const { isLoading, handleResetPassword } = useResetPassword();
  return (
    <Page>
      <Form
        onSubmit={handleResetPassword}
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={schema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <Row>
          <Col md={{ span: 6, offset: 3 }} sm={12}>
            <h2 className="mb-3">Reset Password</h2>
            <Card>
              <Card.Body>
                <Form.Input
                  type="password"
                  name="password"
                  label="Password"
                  disabled={isLoading}
                />
                <Form.Input
                  type="password"
                  name="confirmPassword"
                  label="Confirm password"
                  disabled={isLoading}
                />
                <IconAlert icon={faInfo} variant="light">
                  The new password must be at least 8 characters long, and
                  contain at least one uppercase character, one lowercase
                  character, one number, and one special character
                </IconAlert>
                <div className="d-flex justify-content-end align-items-center">
                  {isLoading && <Spinner className="mr-3" size="sm" />}
                  <Button type="submit" disabled={isLoading}>
                    Reset password
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Page>
  );
};

export default ResetPassword;
