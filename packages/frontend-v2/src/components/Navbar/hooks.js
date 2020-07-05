import { useLocation } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { useUser } from "hooks/useUser";
import { links } from "./constants";

export const useNavbar = () => {
  const { addToast } = useToasts();
  const { isLoggedIn, clearUser } = useUser();
  const { pathname } = useLocation();
  return {
    links: links.map(page => ({
      ...page,
      isActive: pathname === page.url.split("?")[0],
      isVisible: page.isVisible || isLoggedIn === page.isLoggedIn
    })),
    buttons: [
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
