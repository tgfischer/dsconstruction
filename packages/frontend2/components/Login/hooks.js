import { useEffect } from "react";
import { useResource } from "react-request-hook";
import { useFormState } from "react-use-form-state";
import get from "lodash/get";

import { endpoints, defaultHeaders } from "../../constants";
import useUser from "../../hooks/useUser";

export const useLogin = onError => {
  const [{ values }, input] = useFormState();
  const [{ session, email, user, idToken }, setUser] = useUser();
  const [{ data, error, isLoading }, handleLogin] = useResource(data => ({
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
    if (data.session && email) {
      setUser({ session: data.session, email });
    }
    if (data.user && data.idToken) {
      setUser({ user: data.user, idToken: data.idToken });
    }
  }, [data, error]);

  return [
    e => (
      e.preventDefault(), setUser({ email: values.email }), handleLogin(values)
    ),
    input,
    isLoading,
    { session, email, user, idToken }
  ];
};
