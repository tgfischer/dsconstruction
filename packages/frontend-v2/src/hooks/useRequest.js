import { useEffect } from "react";
import useAxios from "axios-hooks";
import { identity } from "lodash";

const defaultOptions = { onSuccess: identity, onError: identity };

const useRequest = (
  config,
  { onSuccess = identity, onError = identity } = defaultOptions
) => {
  const [{ data, loading, error }, execute] = useAxios(config);
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
