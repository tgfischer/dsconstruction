import { useEffect } from "react";
import { useResource } from "react-request-hook";
import get from "lodash/get";

import { endpoints } from "../constants";

export default () => {
  const [{ data, isLoading }, getServices] = useResource(() => ({
    method: "GET",
    url: `${endpoints.backend}/services`
  }));

  useEffect(() => void getServices(), []);
  const services = get(data, "services") || [];
  return [services, isLoading];
};
