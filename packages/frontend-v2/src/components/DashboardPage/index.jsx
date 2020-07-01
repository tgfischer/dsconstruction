import React, { Suspense, lazy } from "react";

const LazyDashboardPage = lazy(() => import("./DashboardPage"));

export const DashboardPage = () => (
  <Suspense fallback={null}>
    <LazyDashboardPage />
  </Suspense>
);
