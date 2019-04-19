import React from "react";
import PropTypes from "prop-types";
import PaperDropzone from "../PaperDropzone";
import { useGalleryDropzone } from "./hooks";

const GalleryDropzone = ({ isLoading }) => {
  const [files, setFiles] = useGalleryDropzone();
  return (
    <PaperDropzone
      files={files}
      setFiles={setFiles}
      isLoading={isLoading}
      multiple
    />
  );
};

GalleryDropzone.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

export default GalleryDropzone;
