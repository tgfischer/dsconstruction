import React, { Suspense, lazy } from "react";

const LazyHomePageSettings = lazy(() => import("./HomePageSettings"));

export const HomePageSettings = props => (
  <Suspense fallback={null}>
    <LazyHomePageSettings {...props} />
  </Suspense>
);
