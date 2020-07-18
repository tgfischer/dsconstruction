import React, { Suspense, lazy } from "react";

const LazyServicesSettings = lazy(() => import("./ServicesSettings"));

export const ServicesSettings = props => (
  <Suspense fallback={null}>
    <LazyServicesSettings {...props} />
  </Suspense>
);
