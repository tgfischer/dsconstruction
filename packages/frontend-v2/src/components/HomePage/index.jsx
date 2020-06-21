import React, { Suspense, lazy } from "react";

const LazyHome = lazy(() => import("./Home"));

export const HomePage = () => (
  <Suspense fallback={null}>
    <LazyHome />
  </Suspense>
);
