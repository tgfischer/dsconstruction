import { useEffect, useContext } from "react";
import get from "lodash/get";

import useRequest from "./useRequest";
import { HomeContext } from "../contexts/HomeProvider";
import { endpoints } from "../constants";

export default () => {
  const [state, setState] = useContext(HomeContext);
  const [{ data, isLoading }, getHome] = useRequest(() => ({
    method: "GET",
    url: `${endpoints.backend}/home`
  }));

  useEffect(() => void setState({ ...state, isLoading: true }), []);
  useEffect(() => void getHome(), []);
  useEffect(() => {
    const home = get(data, "home");
    if (home) {
      setState({ ...state, ...home, isLoading });
    }
  }, [data, isLoading]);

  return [state];
};
