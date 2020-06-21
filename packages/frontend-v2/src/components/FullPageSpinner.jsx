import React from "react";
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiLoadingSpinner
} from "@elastic/eui";

export const FullPageSpinner = () => (
  <EuiPage className="ds-vh-100">
    <EuiPageBody component="div">
      <EuiPageContent
        className="ds-borderless"
        verticalPosition="center"
        horizontalPosition="center"
      >
        <EuiLoadingSpinner className="ds-full-page-spinner" size="xl" />
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
