import React from "react";

import { Spinner } from "components/Spinner";
import { GalleryTable } from "./GalleryTable";
import { useGalleryPageSettings } from "./hooks";

const GalleryPageSettings = () => {
  const { isLoaded, ...gallery } = useGalleryPageSettings();
  return isLoaded ? <GalleryTable {...gallery} /> : <Spinner isCentered />;
};

export default GalleryPageSettings;
