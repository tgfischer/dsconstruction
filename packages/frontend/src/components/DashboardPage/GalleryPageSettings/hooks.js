/* eslint-disable react/prop-types */

import React, { useMemo, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { isNil, take, drop, filter } from "lodash";
import { useDropzone } from "react-dropzone";
import { useToasts } from "react-toast-notifications";
import qs from "qs";
import axios from "axios";

import { useModal, DeleteModal } from "components/Modal";
import { useGalleryPage } from "components/GalleryPage";
import { useQuery } from "hooks/useQuery";
import {
  usePostRequest,
  useDeleteRequest,
  useGetRequest,
  usePutRequest
} from "hooks/useRequest";
import { useSubmit } from "hooks/useSubmit";
import { endpoints } from "constants/api";
import { AddTagForm } from "./AddTagForm";
import { SetTagsForm } from "./SetTagsForm";
import { UploadPhotosForm } from "./UploadPhotosForm";

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
  const { addToast } = useToasts();
  const handleFetchGallery = useCallback(
    () => fetchGallery({ params: { page: 0, tag } }),
    [fetchGallery, tag]
  );
  const [, executeGetSignedUrl] = useGetRequest(
    {
      url: `${endpoints.backend}/gallery/url`
    },
    {
      useAuthorization: true
    }
  );
  const [, executeUploadPhoto] = usePutRequest(
    {
      url: `${endpoints.backend}/gallery`
    },
    {
      useAuthorization: true
    }
  );
  const [{ isLoading: isAddingTag }, executeAddTag] = usePostRequest(
    {
      url: `${endpoints.backend}/gallery/tags`
    },
    {
      successMessage: "Added the category successfully",
      errorMessage: "Failed to add the category",
      onSuccess: fetchTags,
      useAuthorization: true
    }
  );
  const [{ isLoading: isDeletingTag }, executeDeleteTag] = useDeleteRequest(
    {
      url: `${endpoints.backend}/gallery/tags`
    },
    {
      successMessage: "Deleted the category successfully",
      errorMessage: "Failed to delete the category",
      onSuccess: fetchTags,
      useAuthorization: true
    }
  );
  const [{ isLoading: isSettingTags }, executeSetTags] = usePostRequest(
    {
      url: `${endpoints.backend}/gallery/toggle`
    },
    {
      successMessage: "Categorized the photos successfully",
      errorMessage: "Failed to categorize the photos",
      onSuccess: handleFetchGallery,
      useAuthorization: true
    }
  );
  const [
    { isLoading: isDeletingPhotos },
    executeDeletePhotos
  ] = useDeleteRequest(
    {
      url: `${endpoints.backend}/gallery`
    },
    {
      successMessage: "Deleted the photos successfully",
      errorMessage: "Failed to delete the photos",
      onSuccess: fetchTags,
      useAuthorization: true
    }
  );
  const handleSetTags = useCallback(
    async req => {
      await executeSetTags(req);
      await handleFetchGallery();
      setSelectedPhotos([]);
    },
    [executeSetTags, handleFetchGallery]
  );

  return {
    ...gallery,
    tags,
    selectedPhotos,
    setSelectedPhotos,
    isLoaded:
      isLoaded &&
      !isAddingTag &&
      !isDeletingTag &&
      !isSettingTags &&
      !isDeletingPhotos,
    deleteTag: useCallback(
      ({ id, name }) => {
        const message = `Are you sure you want to delete the category "${name}"? You cannot undo this action`;
        return showModal({
          Title: () => "Delete category",
          Content: props => (
            <DeleteModal
              {...props}
              message={message}
              onDelete={() =>
                executeDeleteTag({ data: { id } }).then(fetchTags)
              }
            />
          )
        });
      },
      [executeDeleteTag, fetchTags, showModal]
    ),
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
    uploadPhotos: () => {
      showModal({
        Title: () => "Upload photos",
        Content: ({ onClose, ...props }) => (
          <UploadPhotosForm
            {...props}
            onGetSignedUrl={executeGetSignedUrl}
            onUploadPhoto={executeUploadPhoto}
            onClose={onClose}
            onFinished={() => (handleFetchGallery(), onClose())}
            onError={err =>
              addToast(`Failed to upload photo: ${err}`, {
                appearance: "error"
              })
            }
          />
        )
      });
    },
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
    },
    deletePhotos: useCallback(
      ({ name }) => {
        const message =
          "Are you sure you want to delete the photos you selected? You cannot undo this action";
        return showModal({
          Title: () => "Delete selected photos",
          Content: props => (
            <DeleteModal
              {...props}
              message={message}
              onDelete={() =>
                executeDeletePhotos({ data: selectedPhotos }).then(
                  handleFetchGallery
                )
              }
            />
          )
        });
      },
      [executeDeletePhotos, handleFetchGallery, selectedPhotos, showModal]
    )
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

export const useUploadPhotosForm = ({
  onGetSignedUrl: executeGetSignedUrl,
  onUploadPhoto: executeUploadPhoto,
  onFinished,
  onError,
  ...props
}) => {
  const [{ photos, progress }, setState] = useState({ photos: [] });
  const handleUploadPhoto = useCallback(
    async data => {
      const {
        data: { id, url }
      } = await executeGetSignedUrl();
      await axios.put(url, data, {
        headers: { "Content-Type": data.type }
      });
      await executeUploadPhoto({ data: { id } });
      setState(state => ({ ...state, progress: state.progress + 1 }));
    },
    [executeGetSignedUrl, executeUploadPhoto]
  );
  const [isSubmitting, handleSubmit] = useSubmit({
    handleSubmit: async () => {
      setState(state => ({ ...state, progress: 0 }));
      await Promise.all(photos.map(handleUploadPhoto));
    },
    handleError: onError,
    handleFinish: onFinished
  });
  const { acceptedFiles, ...dropzone } = useDropzone({
    multiple: true,
    accept: "image/*",
    onDropAccepted: files =>
      setState(state => ({ ...state, photos: [...state.photos, ...files] }))
  });
  return {
    ...props,
    ...dropzone,
    photos,
    isSubmitting,
    progress: ((progress ?? 0) / (photos.length || 1)) * 100,
    onSubmit: handleSubmit
  };
};

export const useAddTagForm = ({ onSubmit, onClose }) =>
  useSubmit({
    handleSubmit: data => onSubmit({ data }),
    handleFinish: onClose
  });

export const useSetTagsForm = ({ tags, photos, onSubmit, onClose }) => {
  const [isSubmitting, handleSubmit] = useSubmit({
    handleSubmit: data =>
      onSubmit({
        data: {
          photos,
          tags: Object.keys(data).filter(tag => data[tag])
        }
      }),
    handleFinish: onClose
  });
  return {
    tags,
    initialValues: useMemo(
      () =>
        tags.reduce((values, { name }) => ({ ...values, [name]: false }), {}),
      [tags]
    ),
    isSubmitting,
    handleSubmit,
    handleClose: onClose
  };
};
