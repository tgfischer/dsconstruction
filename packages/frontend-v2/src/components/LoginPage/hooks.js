import { useHistory } from "react-router-dom";

import { usePostRequest } from "hooks/useRequest";
import { endpoints } from "constants/api";
import { useUser } from "hooks/useUser";

export const useLogin = () => {
  const { push } = useHistory();
  const { setUser } = useUser();
  const [{ isLoading }, executeLogin] = usePostRequest(
    {
      url: `${endpoints.users}/login`
    },
    {
      onSuccess: data => {
        setUser(data);
        push("/");
      }
    }
  );

  return {
    isLoading,
    handleLogin: values => executeLogin({ data: values })
  };
};
