import React, { useContext } from "react";
import { useFormState } from "react-use-form-state";
import sortBy from "lodash/sortBy";
import omitBy from "lodash/omitBy";
import path from "path";
import uuid from "uuid";

import { endpoints } from "../../constants";
import PhotosProvider, { PhotosContext } from "../../contexts/PhotosProvider";
import useGallery from "../../hooks/useGallery";
import useModal from "../../hooks/useModal";
import useRequest from "../../hooks/useRequest";
import useBulkUpload from "../../hooks/useBulkUpload";
import useUser from "../../hooks/useUser";
import AddPhotosModal from "./AddPhotosModal";
import ToggleTagsModal from "./ToggleTagsModal";
import AddTagModal from "./AddTagModal";

export const useDashboardGallery = () => {
  const { idToken } = useUser();
  const {
    photos,
    count,
    tags,
    handleSelectPhoto,
    handleGetPage,
    handleDeleteTag,
    isLoading
  } = useGallery({ fetch: false });
  const [showPhotosModal, hidePhotosModal] = useModal(() => () => (
    <PhotosProvider>
      <AddPhotosModal title="Add photos" onClose={hidePhotosModal} isOpen />
    </PhotosProvider>
  ));
  const [showTagModal, hideTagModal] = useModal(() => () => (
    <AddTagModal title="Add a category" onClose={hideTagModal} isOpen />
  ));
  const [showEditModal, hideEditModal] = useModal(() => () => (
    <ToggleTagsModal
      title="Toggle categories"
      onClose={hideEditModal}
      photos={photos.filter(({ isSelected }) => isSelected)}
      tags={sortBy(tags, ["name"])}
      isOpen
    />
  ));
  const [{ isLoading: isDeleting }, handleDeletePhoto] = useRequest(
    data => ({
      method: "DELETE",
      url: `${endpoints.backend}/gallery`,
      data,
      headers: {
        Authorization: idToken
      }
    }),
    () => window.location.reload()
  );

  return {
    photos,
    count,
    showPhotosModal,
    tags,
    showTagModal,
    showEditModal,
    handleDeletePhotos: photos => handleDeletePhoto(photos.map(({ id }) => id)),
    handleDeleteTag,
    handleSelectPhoto,
    handleGetPage,
    isLoading: isLoading || isDeleting
  };
};

export const useGalleryModal = onClose => {
  const { idToken } = useUser();
  const [{ files }] = useContext(PhotosContext);
  const [submitResponse, handleSubmit] = useRequest(
    data => ({
      method: "POST",
      url: `${endpoints.backend}/gallery/`,
      data,
      headers: {
        Authorization: idToken
      }
    }),
    () => {
      window.location.reload();
      onClose();
    }
  );
  const [
    ,
    handleBulkUpload,
    ,
    isUploading,
    progress,
    totalPhotos
  ] = useBulkUpload(
    `${endpoints.backend}/gallery/url`,
    "gallery",
    files,
    data =>
      handleSubmit(
        data.map(({ file }) => ({
          original: "/gallery/" + uuid() + path.extname(file.name)
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
    Boolean(submitResponse.isLoading || isUploading),
    progress,
    totalPhotos
  ];
};

export const useGalleryDropzone = () => {
  const [{ files }, setState] = useContext(PhotosContext);
  return [files, files => setState({ files })];
};

export const useAddTagModal = onClose => {
  const { idToken } = useUser();
  const [{ values }, input] = useFormState({});
  const [submitResponse, handleSubmit] = useRequest(
    data => ({
      method: "POST",
      url: `${endpoints.backend}/gallery/tags`,
      data,
      headers: {
        Authorization: idToken
      }
    }),
    () => {
      window.location.reload();
      onClose();
    }
  );

  return [
    e => {
      e.preventDefault();
      handleSubmit(values);
    },
    input,
    Boolean(submitResponse.isLoading)
  ];
};

export const useToggleTagsModal = photos => {
  const { idToken } = useUser();
  const [{ values: addValues }, addInput] = useFormState({});
  const [{ values: removeValues }, removeInput] = useFormState({});
  const [, handleToggleTags] = useRequest(
    data => ({
      method: "POST",
      url: `${endpoints.backend}/gallery/toggle`,
      data,
      headers: {
        Authorization: idToken
      }
    }),
    () => window.location.reload()
  );
  return [
    addInput.checkbox,
    removeInput.checkbox,
    () =>
      handleToggleTags({
        photos: photos.map(({ id }) => id),
        add: Object.keys(omitBy(addValues, value => !value)),
        remove: Object.keys(omitBy(removeValues, value => !value))
      })
  ];
};
