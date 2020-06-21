import React from "react";

import { Navbar } from "components/Navbar";
import { useMasthead } from "./hooks";

export const Masthead = ({ header, subHeader, ...props }) => {
  const { getMastheadProps } = useMasthead(props);
  return (
    <div className="vh-100" {...getMastheadProps()}>
      <Navbar />
      <div className="ds-masthead-content">
        <h1>{header}</h1>
        <p>{subHeader}</p>
      </div>
    </div>
  );
};
