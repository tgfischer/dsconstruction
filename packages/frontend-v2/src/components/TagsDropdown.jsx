import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

export const TagsDropdown = ({ value, tags, onChange }) => (
  <Form.Control
    className="mb-3 cursor-pointer"
    as="select"
    value={value}
    onChange={onChange}
    custom
  >
    <option value={-1}>Show all photos</option>
    {tags.map(({ id, name }) => (
      <option key={id}>{name}</option>
    ))}
  </Form.Control>
);

TagsDropdown.propTypes = {
  value: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onChange: PropTypes.func.isRequired
};
