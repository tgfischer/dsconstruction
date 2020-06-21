import React from "react";
import { EuiText } from "@elastic/eui";

import { Navbar } from "components/Navbar";
import { useMasthead } from "./hooks";

export const Masthead = ({ header, subHeader, ...props }) => {
  const { getMastheadProps } = useMasthead(props);
  return (
    <div {...getMastheadProps()}>
      <Navbar />
      <EuiText textAlign="center">
        <h1>{header}</h1>
        <p>{subHeader}</p>
      </EuiText>
    </div>
  );
};
