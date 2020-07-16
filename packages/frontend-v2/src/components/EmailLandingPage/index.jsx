import React, { Suspense, lazy } from "react";

const LazyEmailLandingPage = lazy(() => import("./EmailLandingPage"));

export const EmailLandingPage = () => (
  <Suspense fallback={null}>
    <LazyEmailLandingPage />
  </Suspense>
);
