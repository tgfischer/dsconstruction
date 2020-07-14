import React, { Suspense, lazy } from "react";

const LazyResetPassword = lazy(() => import("./ResetPassword"));

export const ResetPasswordPage = () => (
  <Suspense fallback={null}>
    <LazyResetPassword />
  </Suspense>
);
