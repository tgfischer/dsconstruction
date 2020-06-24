import React, { Suspense, lazy } from "react";

const LazyContact = lazy(() => import("./Contact"));

export const ContactPage = () => (
  <Suspense fallback={null}>
    <LazyContact />
  </Suspense>
);
