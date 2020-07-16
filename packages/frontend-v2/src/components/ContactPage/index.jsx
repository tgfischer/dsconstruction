import React from "react";
import { Row, Col } from "react-bootstrap";
import { Formik } from "formik";

import { Page } from "components/Page";
import { ContactForm } from "./ContactForm";
import { Information } from "./Information";
import { useContactPage } from "./hooks";
import { schema } from "./constants";

export * from "./hooks";

export const ContactPage = () => {
  const { contact, isLoaded, isSubmitting, handleSendEmail } = useContactPage();
  return (
    <Page title="Contact" isLoading={!isLoaded}>
      <p className="lead">
        Interested in any of our services? Send us a message to get a quote
      </p>
      <Row>
        <Col md={9} sm={12}>
          <Formik
            onSubmit={handleSendEmail}
            validationSchema={schema}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              message: ""
            }}
            validateOnMount
          >
            {formik => <ContactForm {...formik} isSubmitting={isSubmitting} />}
          </Formik>
        </Col>
        <Col md={3} sm={12}>
          <Information {...contact} />
        </Col>
      </Row>
    </Page>
  );
};
