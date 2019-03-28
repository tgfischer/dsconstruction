import { useEffect } from "react";
import { useResource } from "react-request-hook";
import { useFormState } from "react-use-form-state";
import get from "lodash/get";

import { endpoints } from "../../constants";
import useUser from "../../hooks/useUser";

export default (type, onError) => {
  const [{ values, validity }, input] = useFormState();
  const [{ session, user }, , setUser] = useUser();
  const [{ data, error, isLoading }, handleReset] = useResource(data => ({
    method: "POST",
    url: `${endpoints.users}/reset/${type}`,
    data
  }));

  useEffect(() => {
    const message = get(error, ["data", "err", "message"]);
    if (data && data.user && data.idToken) {
      setUser({ user: data.user, idToken: data.idToken });
    } else if (message) {
      onError(message);
    }
  }, [data, error]);

  return [
    e => {
      e.preventDefault();
      handleReset({ ...user, password: values.password, session });
    },
    input,
    Boolean(validity.password) && Boolean(validity.confirmPassword),
    isLoading
  ];
};
