import React, { Suspense, lazy } from "react";

const LazyUsersSettings = lazy(() => import("./UsersSettings"));

export const UsersSettings = props => (
  <Suspense fallback={null}>
    <LazyUsersSettings {...props} />
  </Suspense>
);
