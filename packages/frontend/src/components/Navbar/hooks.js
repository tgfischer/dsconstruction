import { useLocation, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { useUser } from "hooks/useUser";
import { links, social } from "./constants";

export const useNavbar = () => {
  const { push } = useHistory();
  const { addToast } = useToasts();
  const { isLoggedIn, clearUser } = useUser();
  const { pathname } = useLocation();
  return {
    links: links.map(page => ({
      ...page,
      isActive: pathname === page.url.split("?")[0],
      isVisible: page.isVisible || isLoggedIn === page.isLoggedIn
    })),
    social,
    buttons: [
      {
        displayName: "Log in",
        action: () => push("/login"),
        isVisible: !isLoggedIn
      },
      {
        displayName: "Log out",
        action: () => (
          clearUser(),
          addToast("Logged out successfully", {
            appearance: "success"
          })
        ),
        isVisible: isLoggedIn
      }
    ]
  };
};
