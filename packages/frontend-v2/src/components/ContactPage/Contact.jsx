import React from "react";
import { Row, Col } from "react-bootstrap";

import { Page } from "components/Page";
import { ContactForm } from "./ContactForm";
import { Information } from "./Information";
import { useContact } from "./hooks";

const ContactPage = () => {
  const { contact, isLoading } = useContact();
  return (
    <Page title="Contact" isLoading={isLoading}>
      <p className="lead">
        Interested in any of our services? Send us a message to get a quote
      </p>
      <Row>
        <Col md={9} sm={12}>
          <ContactForm />
        </Col>
        <Col md={3} sm={12}>
          <Information {...contact} />
        </Col>
      </Row>
    </Page>
  );
};

export default ContactPage;
