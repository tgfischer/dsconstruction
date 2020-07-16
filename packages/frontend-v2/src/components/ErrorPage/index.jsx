import React, { Suspense, lazy } from "react";

const LazyErrorPage = lazy(() => import("./ErrorPage"));

export const ErrorPage = () => (
  <Suspense fallback={null}>
    <LazyErrorPage />
  </Suspense>
);
