import { useEffect } from "react";
import get from "lodash/get";

import { endpoints } from "../../constants";
import useRequest from "../hooks/useRequest";

export default () => {
  const [{ data, isLoading }, getServices] = useRequest(() => ({
    method: "GET",
    url: `${endpoints.backend}/services`
  }));

  useEffect(() => void getServices(), []);
  return [get(data, "services") || [], isLoading];
};
