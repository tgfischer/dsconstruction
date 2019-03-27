import { useEffect } from "react";
import { useResource } from "react-request-hook";
import { useFormState } from "react-use-form-state";
import get from "lodash/get";

import { endpoints, defaultHeaders } from "../../constants";
import useUser from "../../hooks/useUser";

export default (type, onError) => {
  const [{ values }, input] = useFormState();
  const [{ session, email, user, idToken }, setUser] = useUser();
  const [{ data, error, isLoading }, handleReset] = useResource(data => ({
    method: "POST",
    url: `${endpoints.users}/login`,
    headers: defaultHeaders,
    data
  }));

  useEffect(() => {
    const message = get(error, ["data", "err", "message"]);
    if (message) {
      return onError(message);
    }
    if (!data) {
      return;
    }
    if (data.user && data.idToken) {
      setUser({ user: data.user, idToken: data.idToken });
    }
  }, [data, error]);

  return [
    e => (e.preventDefault(), handleReset(values)),
    input,
    isLoading,
    { session, email, user, idToken }
  ];
};
