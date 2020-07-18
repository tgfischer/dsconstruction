import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faExclamation, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Page } from "components/Page";
import { IconButton } from "components/IconButton";

const ErrorPage = () => (
  <Page>
    <Row>
      <Col className="text-center" md={{ span: 8, offset: 2 }} sm={12}>
        <p className="h2 mb-3 d-flex justify-content-center align-items-center">
          <FontAwesomeIcon className="mb-0 ml-1 mr-4" icon={faExclamation} />
          Error 404
        </p>
        <p className="mb-5 lead">
          We can't seem to find the page that you are looking for
        </p>
        <IconButton as={Link} to="/" icon={faHome} variant="secondary">
          Return home
        </IconButton>
      </Col>
    </Row>
  </Page>
);

export default ErrorPage;
