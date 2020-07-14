import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { usePostRequest } from "hooks/useRequest";
import { endpoints } from "constants/api";
import { useUser } from "hooks/useUser";

export const useResetPassword = () => {
  const { addToast } = useToasts();
  const { push } = useHistory();
  const { user, session, setUser } = useUser();
  const [{ isLoading }, executeResetPassword] = usePostRequest(
    {
      url: `${endpoints.users}/reset/temporary`
    },
    {
      errorMessage: "Failed to reset the password",
      onSuccess: data => {
        setUser(data);
        push("/");
        return addToast(
          `Welcome back ${data.user.firstName} ${data.user.lastName}`,
          {
            appearance: "success"
          }
        );
      }
    }
  );

  return {
    isLoading,
    handleResetPassword: ({ password }) =>
      executeResetPassword({ data: { ...user, password, session } })
  };
};
