/* eslint-disable react/prop-types */

import React, { useMemo, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { isNil, take, drop, filter } from "lodash";
import qs from "qs";

import { useModal } from "components/Modal";
import { useGalleryPage } from "components/GalleryPage";
import { useQuery } from "hooks/useQuery";
import { usePostRequest, useDeleteRequest } from "hooks/useRequest";
import { endpoints } from "constants/api";
import { AddTagForm } from "./AddTagForm";
import { SetTagsForm } from "./SetTagsForm";

export const useGalleryPageSettings = () => {
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const {
    tags,
    isLoaded,
    photos,
    pagination,
    fetchTags,
    fetchGallery,
    ...gallery
  } = useGalleryPage();
  const { page = 0, size, tag } = useQuery();
  const { push } = useHistory();
  const { showModal } = useModal();
  const [{ isLoading: isAddingTag }, executeAddTag] = usePostRequest(
    {
      url: `${endpoints.backend}/gallery/tags`
    },
    {
      successMessage: "Added the category successfully",
      errorMessage: "Failed to add the category",
      onSuccess: fetchTags
    }
  );
  const [{ isLoading: isDeletingTag }, executeDeleteTag] = useDeleteRequest(
    {
      url: `${endpoints.backend}/gallery/tags`
    },
    {
      successMessage: "Deleted the category successfully",
      errorMessage: "Failed to delete the category",
      onSuccess: fetchTags
    }
  );
  const [{ isLoading: isSettingTags }, executeSetTags] = usePostRequest(
    {
      url: `${endpoints.backend}/gallery/toggle`
    },
    {
      successMessage: "Categorized the photos successfully",
      errorMessage: "Failed to categorize the photos",
      onSuccess: fetchTags
    }
  );
  const handleSetTags = useCallback(
    async req => {
      await executeSetTags(req);
      await fetchGallery({ params: { page: 0, tag } });
      setSelectedPhotos([]);
    },
    [executeSetTags, fetchGallery, tag]
  );

  return {
    ...gallery,
    tags,
    selectedPhotos,
    setSelectedPhotos,
    isLoaded: isLoaded && !isAddingTag && !isDeletingTag && !isSettingTags,
    deleteTag: id => () => executeDeleteTag({ data: { id } }),
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
      push({
        pathname: "/dashboard/gallery",
        search:
          e.target.value === "-1"
            ? qs.stringify({ page: 0, size })
            : qs.stringify({ page: 0, size, tag: e.target.value })
      }),
    addTag: () => {
      showModal({
        Title: () => "Add category",
        Content: props => <AddTagForm {...props} onSubmit={executeAddTag} />
      });
    },
    setTags: () => {
      showModal({
        Title: () => "Categorize photos",
        Content: props => (
          <SetTagsForm
            {...props}
            tags={tags}
            photos={selectedPhotos}
            onSubmit={handleSetTags}
          />
        )
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

export const useAddTagForm = ({ onSubmit, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return {
    isSubmitting,
    onSubmit: data => (
      setIsSubmitting(true),
      onSubmit({ data })
        .then(() => (setIsSubmitting(false), onClose()))
        .catch(() => (setIsSubmitting(false), onClose()))
    )
  };
};

export const useSetTagsForm = ({ tags, photos, onSubmit, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return {
    tags,
    initialValues: useMemo(
      () =>
        tags.reduce((values, { name }) => ({ ...values, [name]: false }), {}),
      [tags]
    ),
    isSubmitting,
    onClose,
    onSubmit: data => (
      setIsSubmitting(true),
      onSubmit({
        data: {
          photos,
          tags: Object.keys(data).filter(tag => data[tag])
        }
      })
        .then(() => (setIsSubmitting(false), onClose()))
        .catch(() => (setIsSubmitting(false), onClose()))
    )
  };
};
