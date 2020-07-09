import { useEffect, useState } from "react";
import axios from "axios";
import { makeUseAxios } from "axios-hooks";
import { identity } from "lodash";
import qs from "qs";
import { useToasts } from "react-toast-notifications";

const useAxios = makeUseAxios({
  axios: axios.create({
    paramsSerializer: qs.stringify
  })
});

const defaultOptions = { onSuccess: identity, onError: identity };

const useRequest = (
  config,
  {
    onSuccess = identity,
    onError = identity,
    successMessage,
    errorMessage
  } = defaultOptions
) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [{ data, loading, error }, execute] = useAxios(config, {
    manual: true
  });
  const { addToast } = useToasts();
  useEffect(() => {
    if (!data) {
      return;
    }
    setIsLoaded(true);
    onSuccess(data);
    if (successMessage) {
      addToast(successMessage, {
        appearance: "success"
      });
    }
  }, [addToast, data, onSuccess, successMessage]);
  useEffect(() => {
    if (!error) {
      return;
    }
    setIsLoaded(true);
    onError(error);
    if (errorMessage) {
      addToast(`${errorMessage}: ${error}`, {
        appearance: "error"
      });
    }
  }, [addToast, error, onError, errorMessage]);
  return [
    { data, error, isLoading: loading, isLoaded: isLoaded && !loading },
    execute
  ];
};

export const useGetRequest = (config, options) =>
  useRequest({ ...config, method: "GET" }, options);
export const usePostRequest = (config, options) =>
  useRequest({ ...config, method: "POST" }, options);
export const useDeleteRequest = (config, options) =>
  useRequest({ ...config, method: "DELETE" }, options);
