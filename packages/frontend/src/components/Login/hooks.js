import { useEffect } from "react";
import { useResource } from "react-request-hook";
import { useFormState } from "react-use-form-state";
import get from "lodash/get";

import { endpoints, defaultHeaders } from "../../constants";
import useUser from "../../hooks/useUser";

export const useLogin = (history, onError) => {
  const [{ values, validity }, input] = useFormState();
  const [{ session, user, idToken }, setUser] = useUser();
  const [{ data, error, isLoading }, handleLogin] = useResource(data => ({
    method: "POST",
    url: `${endpoints.users}/login`,
    headers: defaultHeaders,
    data
  }));

  useEffect(() => {
    const message = get(error, ["data", "err", "message"]);
    if (data && data.session && data.user) {
      setUser({ session: data.session, user: data.user });
    } else if (data && data.idToken && data.user) {
      setUser({ idToken: data.idToken, user: data.user });
    } else if (message) {
      onError(message);
    }
  }, [data, error]);

  useEffect(() => {
    if (user && idToken) {
      history.replace("/");
    } else if (session && user) {
      history.replace("/reset/temporary");
    }
  }, [session, user, idToken]);

  return [
    e => {
      e.preventDefault();
      setUser({ email: values.email });
      handleLogin(values);
    },
    input,
    Boolean(validity.email) && Boolean(validity.password),
    isLoading
  ];
};
