import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { usePostRequest } from "hooks/useRequest";
import { endpoints } from "constants/api";
import { useUser } from "hooks/useUser";

export const useLogin = () => {
  const { addToast } = useToasts();
  const { push } = useHistory();
  const { setUser } = useUser();
  const [{ isLoading }, executeLogin] = usePostRequest(
    {
      url: `${endpoints.users}/login`
    },
    {
      onSuccess: data => (
        setUser(data),
        push("/"),
        addToast(`Welcome back ${data.user.firstName} ${data.user.lastName}`, {
          appearance: "success"
        })
      )
    }
  );

  return {
    isLoading,
    handleLogin: values => executeLogin({ data: values })
  };
};
