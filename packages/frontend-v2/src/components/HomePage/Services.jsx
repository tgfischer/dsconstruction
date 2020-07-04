import React from "react";
import { Badge, Row, Col } from "react-bootstrap";

import { Section } from "./Section";
import { useServices } from "./hooks";

export const Services = () => {
  const { services, isLoaded } = useServices();
  return (
    <Section title="Services" isLoading={!isLoaded}>
      <Row>
        {services.map(({ id, name }, i) => (
          <Col key={i} lg={3} md={4} sm={6} xs={12}>
            <h5>
              <Badge variant="dark">{name}</Badge>
            </h5>
          </Col>
        ))}
      </Row>
    </Section>
  );
};
