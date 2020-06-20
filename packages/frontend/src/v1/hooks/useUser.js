import { useCookies } from "react-cookie";
import get from "lodash/get";

const cookieName = "ds_construction";

export default () => {
  const [cookies, setCookie, removeCookie] = useCookies([cookieName]);
  const user = get(cookies, [cookieName]);
  return {
    ...user,
    isLoggedIn: Boolean(user && user.user && user.idToken && user.refreshToken),
    isChallenged: Boolean(user && user.user && user.session),
    setUser: user => {
      setCookie(cookieName, user, { path: "/" });
    },
    clearUser: () => {
      removeCookie(cookieName, { path: "/" });
    }
  };
};
