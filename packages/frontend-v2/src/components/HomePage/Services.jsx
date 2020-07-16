import React from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import { Section } from "./Section";
import { useServices } from "./hooks";

export const Services = () => {
  const { services, isLoaded } = useServices();
  return (
    <Section
      title="Services"
      subtitle="D's Construction provides a wide variety of professional services. Contact our team today to get a quote!"
      variant="dark"
      isLoading={!isLoaded}
      isCentered
    >
      <Row>
        <Col md={{ offset: 1, span: 10 }}>
          <Row>
            {services.map(({ id, name }, i) => (
              <Col
                key={i}
                className="mb-3 d-flex align-items-center"
                md={4}
                sm={6}
                xs={12}
              >
                <FontAwesomeIcon className="mr-2" icon={faCheckCircle} />
                <span className="h5 mb-0">{name}</span>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Section>
  );
};
