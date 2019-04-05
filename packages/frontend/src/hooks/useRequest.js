import { useEffect } from "react";
import { useResource } from "react-request-hook";
import { useSnackbar } from "notistack";
import identity from "lodash/identity";
import get from "lodash/get";

export default (request, onSuccess = identity, onError = identity) => {
  const [response, handleRequest] = useResource(request);
  const { enqueueSnackbar } = useSnackbar();
  const err = get(response, ["error", "data", "err", "message"]);

  useEffect(() => {
    if (response.data) {
      onSuccess(response.data);
    }
  }, [response.data]);
  useEffect(() => {
    if (err) {
      enqueueSnackbar(err, {
        variant: "error",
        preventDuplicate: true
      });
      onError(err);
    }
  }, [err]);
  return [response, handleRequest];
};
