import React from "react";

import { FullPageSpinner } from "components/FullPageSpinner";

export const Page = ({ isLoading, children }) => (
  <>
    {isLoading && <FullPageSpinner />}
    {children}
  </>
);
