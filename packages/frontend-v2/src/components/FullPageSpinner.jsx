import React from "react";
import { Spinner } from "react-bootstrap";

export const FullPageSpinner = () => (
  <div className="vh-100 d-flex justify-content-center align-items-center">
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);
