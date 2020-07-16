import { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { makeUseAxios } from "axios-hooks";
import { identity, merge } from "lodash";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import qs from "qs";

import { useUser } from "hooks/useUser";

const useAxios = makeUseAxios({
  axios: axios.create({
    paramsSerializer: qs.stringify
  })
});

const defaultOptions = {
  onSuccess: identity,
  onError: identity,
  useAuthorization: false
};

const getRequest = (config = {}, { useAuthorization, token }) =>
  useAuthorization
    ? merge(config, { headers: { Authorization: token } })
    : config;

const useRequest = (
  config,
  {
    onSuccess = identity,
    onError = identity,
    successMessage,
    errorMessage,
    useAuthorization = false
  } = defaultOptions
) => {
  const { idToken: token, clearUser } = useUser();
  const [isLoaded, setIsLoaded] = useState(false);
  const request = useMemo(
    () => getRequest(config, { useAuthorization, token }),
    [config, token, useAuthorization]
  );
  const [{ data, loading, error }, execute] = useAxios(request, {
    manual: true
  });
  const { addToast } = useToasts();
  const { push } = useHistory();
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
    if (error.response?.status === 401) {
      clearUser();
      push("/login");
      addToast("Your credentials have expired. Please log in again", {
        appearance: "error"
      });
    } else if (errorMessage) {
      const message = error.response?.data?.err?.message ?? error;
      addToast(`${errorMessage}: ${message}`, {
        appearance: "error"
      });
    }
  }, [addToast, error, onError, errorMessage, clearUser, push]);
  return [
    { data, error, isLoading: loading, isLoaded: isLoaded && !loading },
    useCallback(
      config => execute(getRequest(config, { useAuthorization, token })),
      [execute, token, useAuthorization]
    )
  ];
};

export const useGetRequest = (config, options) =>
  useRequest({ ...config, method: "GET" }, options);
export const usePostRequest = (config, options) =>
  useRequest({ ...config, method: "POST" }, options);
export const usePutRequest = (config, options) =>
  useRequest({ ...config, method: "PUT" }, options);
export const useDeleteRequest = (config, options) =>
  useRequest({ ...config, method: "DELETE" }, options);
