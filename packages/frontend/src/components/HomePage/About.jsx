import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";

import { Section } from "./Section";

export const About = ({ children }) => (
  <Section className="text-justify">
    <Row>
      <Col sm={{ span: 8, offset: 2 }} xs={12}>
        <p className="lead">{children}</p>
      </Col>
    </Row>
  </Section>
);

About.propTypes = {
  children: PropTypes.node.isRequired
};
