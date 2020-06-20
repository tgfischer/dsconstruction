import React from "react";

import PaperDropzone from "../PaperDropzone";
import { useGalleryDropzone } from "./hooks";

const GalleryDropzone = () => {
  const [files, setFiles] = useGalleryDropzone();
  return <PaperDropzone files={files} setFiles={setFiles} multiple />;
};

export default GalleryDropzone;
