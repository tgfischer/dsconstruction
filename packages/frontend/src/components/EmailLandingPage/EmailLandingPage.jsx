import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import { Page } from "components/Page";
import { IconButton } from "components/IconButton";

const EmailLandingPage = () => (
  <Page>
    <Row>
      <Col className="text-center" md={{ span: 8, offset: 2 }} sm={12}>
        <p className="h2 mb-3">Email successfully sent!</p>
        <p className="lead mb-5">
          Your message has been received, and we will get back to you as soon as
          we can
        </p>
        <IconButton as={Link} to="/" icon={faHome} variant="primary">
          Return home
        </IconButton>
      </Col>
    </Row>
  </Page>
);

export default EmailLandingPage;
