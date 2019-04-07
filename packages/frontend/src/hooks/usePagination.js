import { useState, useEffect } from "react";

import { endpoints } from "../constants";
import useRequest from "../hooks/useRequest";

export default (url, size) => {
  const [state, setState] = useState({ size });
  const [{ data, isLoading }, getPage] = useRequest(() => ({
    method: "GET",
    url: `${endpoints.backend}` + url,
    params: {
      size: state.size,
      page: state.page
    }
  }));

  useEffect(() => void getPage(), []);
  return [
    data,
    isLoading,
    getPage,
    size => setState({ size, page: state.page })
  ];
};
