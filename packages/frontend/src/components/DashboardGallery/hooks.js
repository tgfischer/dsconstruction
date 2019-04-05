import React, { useContext } from "react";
import Button from "@material-ui/core/Button";

import { endpoints } from "../../constants";
import PhotosProvider, { PhotosContext } from "../../contexts/PhotosProvider";
import useGallery from "../../hooks/useGallery";
import useModal from "../../hooks/useModal";
import useRequest from "../../hooks/useRequest";
import useBulkUpload from "../../hooks/useBulkUpload";
import DashboardGalleryDialog from "./DashboardGalleryDialog";

export const useDashboardGallery = () => {
  const [photos, isLoading] = useGallery();
  const [showModal, hideModal] = useModal(() => () => (
    <PhotosProvider>
      <DashboardGalleryDialog
        title="Add photos"
        onClose={hideModal}
        submitButton={() => <Button onClick={hideModal}>Add</Button>}
        isOpen
      />
    </PhotosProvider>
  ));
  const [, handleDelete] = useRequest(
    data => ({
      method: "DELETE",
      url: `${endpoints.backend}/gallery`,
      data
    }),
    () => window.location.reload()
  );
  return [
    photos,
    showModal,
    ({ data }) => {
      handleDelete(data.map(({ index }) => photos[index].id));
    },
    isLoading
  ];
};

export const useGalleryDialog = onClose => {
  const [{ files }] = useContext(PhotosContext);
  const [submitResponse, handleSubmit] = useRequest(
    data => ({
      method: "POST",
      url: `${endpoints.backend}/gallery/add`,
      data
    }),
    () => {
      window.location.reload();
      onClose();
    }
  );
  const [, handleBulkUpload, , isUploading] = useBulkUpload(
    `${endpoints.photos}/upload`,
    "gallery",
    files,
    data =>
      handleSubmit(
        data.map(({ file }) => ({
          original: "/gallery/" + file.name
        }))
      )
  );

  return [
    e => {
      e.preventDefault();
      handleBulkUpload({
        files: files.map(({ name }) => "gallery/" + name)
      });
    },
    Boolean(submitResponse.isLoading || isUploading)
  ];
};

export const useGalleryDropzone = () => {
  const [{ files }, setState] = useContext(PhotosContext);
  return [files, files => setState({ files })];
};
