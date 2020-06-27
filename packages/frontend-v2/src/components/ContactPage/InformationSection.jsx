import React from "react";
import PropTypes from "prop-types";

export const InformationSection = ({ title, children }) => (
  <div className="mb-4">
    <h6>title</h6>
    {children}
  </div>
);

InformationSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
