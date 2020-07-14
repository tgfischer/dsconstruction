import { useCookies } from "react-cookie";

import { cookieName } from "./constants";

export * from "./constants";

export const useUser = () => {
  const [cookies = {}, setCookie, removeCookie] = useCookies([cookieName]);
  const cookie = cookies[cookieName] ?? {};
  return {
    ...cookie,
    isLoggedIn: Boolean(cookie?.idToken && cookie?.refreshToken),
    isChallenged: Boolean(cookie?.challengeName),
    setUser: user => setCookie(cookieName, user, { path: "/" }),
    clearUser: () => removeCookie(cookieName, { path: "/" })
  };
};
