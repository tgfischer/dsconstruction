import React from "react";
import PropTypes from "prop-types";

export const View = ({ data }) => (
  <img
    className="d-flex mw-100 m-auto"
    style={{ maxHeight: "calc(100vh - 5em)" }}
    src={data.source.regular}
    alt={data.source.regular}
  />
);

View.propTypes = {
  data: PropTypes.shape({
    source: PropTypes.shape({
      regular: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};
