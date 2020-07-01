import React, { Suspense, lazy } from "react";

const LazyContactPageSettings = lazy(() => import("./ContactPageSettings"));

export const ContactPageSettings = props => (
  <Suspense fallback={null}>
    <LazyContactPageSettings {...props} />
  </Suspense>
);
