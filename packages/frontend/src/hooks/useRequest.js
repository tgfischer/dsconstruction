import { useEffect } from "react";
import { useResource } from "react-request-hook";
import { useSnackbar } from "notistack";
import identity from "lodash/identity";
import get from "lodash/get";

export default (request, onSuccess = identity, onError = identity) => {
  const [response, handleRequest] = useResource(request);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (response.data) {
      onSuccess(response.data);
    }
  }, [response.data]);
  useEffect(() => {
    if (!response.error) {
      return;
    }

    let err =
      get(response, ["error", "data", "err", "message"]) ||
      get(response, ["error", "data", "error"]) ||
      get(response, ["error", "data", "err"]);

    if (typeof err !== "string") {
      err = "Something went wrong. Please refresh the page and try again";
    }

    if (err) {
      enqueueSnackbar(err, {
        variant: "error",
        preventDuplicate: true
      });
      onError(err);
      response.cancel();
    }
  }, [response.error]);
  return [response, handleRequest];
};
