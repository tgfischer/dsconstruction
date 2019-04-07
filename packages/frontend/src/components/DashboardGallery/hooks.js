import React, { useContext } from "react";
import { useFormState } from "react-use-form-state";
import sortBy from "lodash/sortBy";
import omitBy from "lodash/omitBy";

import { endpoints } from "../../constants";
import PhotosProvider, { PhotosContext } from "../../contexts/PhotosProvider";
import useGallery from "../../hooks/useGallery";
import useModal from "../../hooks/useModal";
import useRequest from "../../hooks/useRequest";
import useBulkUpload from "../../hooks/useBulkUpload";
import useTags from "../../hooks/useTags";
import AddPhotosModal from "./AddPhotosModal";
import ToggleTagsModal from "./ToggleTagsModal";
import AddTagModal from "./AddTagModal";

export const useDashboardGallery = () => {
  const [photos, toggleSelect, isLoading] = useGallery({ size: 12 });
  const [tags, deleteTag] = useTags();
  const [showPhotosModal, hidePhotosModal] = useModal(() => () => (
    <PhotosProvider>
      <AddPhotosModal title="Add photos" onClose={hidePhotosModal} isOpen />
    </PhotosProvider>
  ));
  const [showTagModal, hideTagModal] = useModal(() => () => (
    <AddTagModal title="Add a tag" onClose={hideTagModal} isOpen />
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
  const [, handleDeletePhoto] = useRequest(
    data => ({
      method: "DELETE",
      url: `${endpoints.backend}/gallery`,
      data
    }),
    () => window.location.reload()
  );

  return [
    photos,
    showPhotosModal,
    tags,
    showTagModal,
    showEditModal,
    photos => handleDeletePhoto(photos.map(({ id }) => id)),
    deleteTag,
    toggleSelect,
    isLoading
  ];
};

export const useGalleryModal = onClose => {
  const [{ files }] = useContext(PhotosContext);
  const [submitResponse, handleSubmit] = useRequest(
    data => ({
      method: "POST",
      url: `${endpoints.backend}/gallery/`,
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

export const useAddTagModal = onClose => {
  const [{ values }, input] = useFormState({});
  const [submitResponse, handleSubmit] = useRequest(
    data => ({
      method: "POST",
      url: `${endpoints.backend}/gallery/tags`,
      data
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
  const [{ values: addValues }, addInput] = useFormState({});
  const [{ values: removeValues }, removeInput] = useFormState({});
  const [, handleToggleTags] = useRequest(
    data => ({
      method: "POST",
      url: `${endpoints.backend}/gallery/toggle`,
      data
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
