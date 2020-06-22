import React, { Suspense, lazy } from "react";

const LazyGallery = lazy(() => import("./Gallery"));

export const GalleryPage = () => (
  <Suspense fallback={null}>
    <LazyGallery />
  </Suspense>
);
