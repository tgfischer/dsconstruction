import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Form } from "react-bootstrap";
import { Formik } from "formik";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

import { Modal } from "components/Modal";
import { IconAlert } from "components/IconAlert";
import { useSetTagsForm } from "./hooks";

export const SetTagsForm = props => {
  const {
    tags,
    initialValues,
    isSubmitting,
    onClose,
    onSubmit
  } = useSetTagsForm(props);
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, handleSubmit, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          <IconAlert icon={faInfo} variant="light">
            Each category that is chosen below will be applied to the photos
            that were selected
          </IconAlert>
          {tags.map(({ id, name }) => (
            <Form.Group key={id} as={Row} controlId={name}>
              <Col xs={12}>
                <Form.Check
                  name={name}
                  label={name}
                  checked={values[name]}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  custom
                />
              </Col>
            </Form.Group>
          ))}
          <Modal.Actions
            submitText="Set categories"
            isSubmitting={isSubmitting}
            onClose={onClose}
          />
        </Form>
      )}
    </Formik>
  );
};

SetTagsForm.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};
