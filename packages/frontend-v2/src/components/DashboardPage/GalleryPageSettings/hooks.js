/* eslint-disable react/prop-types */

import React, { useMemo, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { isNil, take, drop, filter } from "lodash";
import { useToasts } from "react-toast-notifications";
import qs from "qs";

import { useModal } from "components/Modal";
import { useGalleryPage } from "components/GalleryPage";
import { useQuery } from "hooks/useQuery";
import { usePostRequest, useDeleteRequest } from "hooks/useRequest";
import { endpoints } from "constants/api";
import { AddTagForm } from "./AddTagForm";

export const useGalleryPageSettings = () => {
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const {
    isLoaded,
    photos,
    pagination,
    fetchTags,
    ...gallery
  } = useGalleryPage();
  const { page = 0, size } = useQuery();
  const { push } = useHistory();
  const { showModal } = useModal();
  const { addToast } = useToasts();
  const [{ isLoading: isAddingTag }, handleAddTag] = usePostRequest(
    {
      url: `${endpoints.backend}/gallery/tags`
    },
    {
      onSuccess: useCallback(
        () => (
          addToast("Added the tag successfully", {
            appearance: "success"
          }),
          fetchTags()
        ),
        [addToast, fetchTags]
      ),
      onError: useCallback(
        err =>
          addToast(`Failed to add the tag: ${err.message}`, {
            appearance: "error"
          }),
        [addToast]
      )
    }
  );
  const [{ isLoading: isDeletingTag }, handleDeleteTag] = useDeleteRequest(
    {
      url: `${endpoints.backend}/gallery/tags`
    },
    {
      onSuccess: useCallback(
        () => (
          addToast("Deleted the service successfully", {
            appearance: "success"
          }),
          fetchTags()
        ),
        [addToast, fetchTags]
      ),
      onError: useCallback(
        err =>
          addToast(`Failed to delete the service: ${err.message}`, {
            appearance: "error"
          }),
        [addToast]
      )
    }
  );
  return {
    ...gallery,
    selectedPhotos,
    setSelectedPhotos,
    isLoaded: isLoaded && !isAddingTag && !isDeletingTag,
    deleteTag: id => () => handleDeleteTag({ data: { id } }),
    photos: useMemo(
      () => (isNil(size) ? photos : take(drop(photos, page * size), size)),
      [page, photos, size]
    ),
    pagination: {
      ...pagination,
      onChange: nextPage => () =>
        push({
          pathname: "/dashboard/gallery",
          search: qs.stringify({ page: nextPage, size })
        })
    },
    onChangeTag: e =>
      e.target.value === "-1"
        ? push({
            pathname: "/dashboard/gallery",
            search: qs.stringify({ page: 0, size })
          })
        : push({
            pathname: "/dashboard/gallery",
            search: qs.stringify({ page: 0, size, tag: e.target.value })
          }),
    addTag: () => {
      showModal({
        Title: () => "Add tag",
        Content: props => <AddTagForm {...props} onAdd={handleAddTag} />
      });
    }
  };
};

export const useGalleryTable = ({ selectedPhotos, setSelectedPhotos }) => {
  return {
    selectedPhotos,
    onClick: id => () =>
      setSelectedPhotos(
        selectedPhotos.includes(id)
          ? filter(selectedPhotos, o => o !== id)
          : [...selectedPhotos, id]
      ),
    getPreviewProps: ({ thumbnail }) => ({
      className: "ds-gallery-preview pt-2 pl-2",
      style: {
        background: `url(${thumbnail}) no-repeat center center / cover`
      }
    })
  };
};

export const useAddTagForm = ({ onAdd, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return {
    isSubmitting,
    onSubmit: data => (
      setIsSubmitting(true),
      onAdd({ data })
        .then(() => (setIsSubmitting(false), onClose()))
        .catch(() => (setIsSubmitting(false), onClose()))
    )
  };
};
