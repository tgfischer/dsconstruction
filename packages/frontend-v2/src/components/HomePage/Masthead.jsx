import React from "react";
import PropTypes from "prop-types";

import { Navbar } from "components/Navbar";
import { useMasthead } from "./hooks";

export const Masthead = ({ header, subHeader, ...props }) => {
  const { getMastheadProps } = useMasthead(props);
  return (
    <div className="vh-100" {...getMastheadProps()}>
      <Navbar />
      <div className="ds-masthead-content d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-light">{header}</h1>
        <p className="text-light lead">{subHeader}</p>
      </div>
    </div>
  );
};

Masthead.propTypes = {
  header: PropTypes.string.isRequired,
  subHeader: PropTypes.string.isRequired
};
