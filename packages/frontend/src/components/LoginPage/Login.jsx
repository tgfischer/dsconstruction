import React from "react";
import { Form } from "react-bootstrap-formik";
import { Button, Row, Col, Card } from "react-bootstrap";

import { Page } from "components/Page";
import { Spinner } from "components/Spinner";
import { schema } from "./constants";
import { useLogin } from "./hooks";

const Login = () => {
  const { isLoading, handleLogin } = useLogin();
  return (
    <Page>
      <Form
        onSubmit={handleLogin}
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        validateOnMount
      >
        <Row>
          <Col md={{ span: 6, offset: 3 }} sm={12}>
            <h2 className="mb-3">Login</h2>
            <Card>
              <Card.Body>
                <Form.Input name="email" label="Email" disabled={isLoading} />
                <Form.Input
                  type="password"
                  name="password"
                  label="Password"
                  disabled={isLoading}
                />
                <div className="d-flex justify-content-end align-items-center">
                  {isLoading && <Spinner className="mr-3" size="sm" />}
                  <Button type="submit" disabled={isLoading}>
                    Login
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

export default Login;
