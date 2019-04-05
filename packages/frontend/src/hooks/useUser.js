import { useCookies } from "react-cookie";
import get from "lodash/get";

const cookieName = "ds_construction";

export default () => {
  const [cookies, setCookie, removeCookie] = useCookies([cookieName]);
  const user = get(cookies, [cookieName]);
  return [
    user || {},
    Boolean(user && user.user && user.idToken),
    Boolean(user && user.user && user.session),
    user => {
      setCookie(cookieName, user, { path: "/" });
    },
    () => {
      removeCookie(cookieName, { path: "/" });
    }
  ];
};
