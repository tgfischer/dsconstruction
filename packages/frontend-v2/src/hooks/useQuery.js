import { useLocation } from "react-router-dom";
import qs from "qs";

export const useQuery = () =>
  qs.parse(useLocation().search, { ignoreQueryPrefix: true });
