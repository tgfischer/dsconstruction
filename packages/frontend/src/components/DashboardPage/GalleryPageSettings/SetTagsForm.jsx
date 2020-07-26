import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap-formik";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

import { Modal } from "components/Modal";
import { IconAlert } from "components/IconAlert";
import { useSetTagsForm } from "./hooks";

export const SetTagsForm = props => {
  const { tags, isSubmitting, handleClose, handleSubmit } = useSetTagsForm(
    props
  );
  return (
    <Form initialValues={{ tags: [] }} onSubmit={handleSubmit}>
      <IconAlert icon={faInfo} variant="light">
        Each category that is chosen below will be applied to the photos that
        were selected
      </IconAlert>
      <Form.Group name="tags">
        {tags.map(({ id, name }) => (
          <Form.Checkbox
            key={id}
            name={name}
            label={name}
            disabled={isSubmitting}
            custom
          />
        ))}
      </Form.Group>
      <Modal.Actions
        submitText="Set categories"
        isSubmitting={isSubmitting}
        onClose={handleClose}
      />
    </Form>
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
