import React, { Suspense, lazy } from "react";

const LazyLogin = lazy(() => import("./Login"));

export const LoginPage = () => (
  <Suspense fallback={null}>
    <LazyLogin />
  </Suspense>
);
