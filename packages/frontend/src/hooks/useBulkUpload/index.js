import { useReducer, useEffect } from "react";
import { useSnackbar } from "notistack";
import identity from "lodash/identity";
import find from "lodash/find";

import * as constants from "./constants";
import useRequest from "../useRequest";
import action from "./action";
import reducer from "./reducer";

export default (url, folder, files, onUploaded = identity) => {
  const { enqueueSnackbar } = useSnackbar();
  const [{ data, isUploaded, isUploading }, dispatch] = useReducer(reducer, {
    isUploaded: false,
    isUploading: false
  });
  const [response, handleRequest] = useRequest(
    data => ({
      method: "POST",
      url,
      data
    }),
    ({ data }) => {
      if (!data) {
        return;
      }
      action(
        dispatch,
        data.map(({ url, file }) => ({
          url,
          file: find(files, ({ name }) => `${folder}/${name}` === file)
        })),
        ({ message }) =>
          enqueueSnackbar(message, {
            variant: "error",
            preventDuplicate: true
          })
      );
    },
    err => dispatch({ type: constants.FAILURE, err })
  );

  useEffect(() => {
    if (isUploaded) {
      onUploaded(data);
    }
  }, [isUploaded]);

  return [
    response,
    payload => {
      handleRequest(payload);
      dispatch({ type: constants.SET_IS_UPLOADING });
    },
    isUploaded,
    isUploading
  ];
};
