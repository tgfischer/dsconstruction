import React, { Suspense, lazy } from "react";

const LazyGalleryPageSettings = lazy(() => import("./GalleryPageSettings"));

export const GalleryPageSettings = props => (
  <Suspense fallback={null}>
    <LazyGalleryPageSettings {...props} />
  </Suspense>
);
