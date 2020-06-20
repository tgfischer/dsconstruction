import { useFormState } from "react-use-form-state";

import { endpoints } from "../../../constants";
import useUser from "../../hooks/useUser";
import useRequest from "../../hooks/useRequest";

export default (history, type) => {
  const [{ values, validity }, input] = useFormState();
  const { user, session, setUser, clearUser } = useUser();
  const [{ isLoading }, handleReset] = useRequest(
    data => ({
      method: "POST",
      url: `${endpoints.users}/reset/${type}`,
      data
    }),
    ({ user, idToken, refreshToken }) => {
      if (user && idToken && refreshToken) {
        setUser({ user, idToken, refreshToken });
      }
    },
    () => {
      clearUser();
      history.replace("/login");
    }
  );

  return [
    e => {
      e.preventDefault();
      handleReset({
        ...user,
        password: values.password,
        session: session
      });
    },
    input,
    Boolean(validity.password) && Boolean(validity.confirmPassword),
    isLoading
  ];
};
