import { useEffect } from "react";
import axios from "axios";
import { makeUseAxios } from "axios-hooks";
import { identity } from "lodash";
import qs from "qs";

const useAxios = makeUseAxios({
  axios: axios.create({
    paramsSerializer: qs.stringify
  })
});

const defaultOptions = { onSuccess: identity, onError: identity };

const useRequest = (
  config,
  { onSuccess = identity, onError = identity } = defaultOptions
) => {
  const [{ data, loading, error }, execute] = useAxios(config, {
    manual: true
  });
  useEffect(() => {
    if (!data) {
      return;
    }
    onSuccess(data);
  }, [data, onSuccess]);
  useEffect(() => {
    if (!error) {
      return;
    }
    onError(error);
  }, [error, onError]);
  return [{ data, error, isLoading: loading }, execute];
};

export const useGetRequest = (config, options) =>
  useRequest({ ...config, method: "GET" }, options);
export const usePostRequest = (config, options) =>
  useRequest({ ...config, method: "POST" }, options);
export const useDeleteRequest = (config, options) =>
  useRequest({ ...config, method: "DELETE" }, options);
