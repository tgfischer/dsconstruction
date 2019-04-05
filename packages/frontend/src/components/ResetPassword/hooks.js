import { useFormState } from "react-use-form-state";

import { endpoints } from "../../constants";
import useUser from "../../hooks/useUser";
import useRequest from "../../hooks/useRequest";

export default (history, type) => {
  const [{ values, validity }, input] = useFormState();
  const [{ session, user }, , , setUser, clearUser] = useUser();
  const [{ isLoading }, handleReset] = useRequest(
    data => ({
      method: "POST",
      url: `${endpoints.users}/reset/${type}`,
      data
    }),
    ({ user, idToken }) => {
      if (user && idToken) {
        setUser({ user, idToken });
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
      handleReset({ ...user, password: values.password, session });
    },
    input,
    Boolean(validity.password) && Boolean(validity.confirmPassword),
    isLoading
  ];
};
