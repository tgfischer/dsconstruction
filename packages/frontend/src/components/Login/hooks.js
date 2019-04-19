import { useEffect } from "react";
import { useFormState } from "react-use-form-state";

import { endpoints } from "../../constants";
import useUser from "../../hooks/useUser";
import useRequest from "../../hooks/useRequest";

export const useLogin = history => {
  const [{ values, validity }, input] = useFormState();
  const { isChallenged, setUser, clearUser } = useUser();
  const [{ isLoading }, handleLogin] = useRequest(
    data => ({
      method: "POST",
      url: `${endpoints.users}/login`,
      data
    }),
    ({ session, user, idToken, refreshToken }) => {
      if (!user) {
        return;
      }

      if (session) {
        setUser({ session, user });
      } else if (idToken && refreshToken) {
        setUser({ idToken, refreshToken, user });
      }
    },
    clearUser
  );

  useEffect(() => {
    if (isChallenged) {
      history.replace("/reset/temporary");
    }
  }, [isChallenged]);

  return [
    e => {
      e.preventDefault();
      setUser({ user: { email: values.email } });
      handleLogin(values);
    },
    input,
    Boolean(validity.email) && Boolean(validity.password),
    isLoading
  ];
};
