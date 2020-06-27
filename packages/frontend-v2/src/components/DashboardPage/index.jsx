import React, { Suspense, lazy } from "react";

const LazyDashboard = lazy(() => import("./Dashboard"));

export const DashboardPage = () => (
  <Suspense fallback={null}>
    <LazyDashboard />
  </Suspense>
);
