import { useEffect } from "react";
import axios from "axios";

import { defaultHeaders } from "../constants";

const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

const apiAction = (method, url, headers, body, options) => async dispatch => {
  try {
    dispatch({ type: REQUEST });
    const response = await axios({
      method,
      url,
      headers: {
        ...defaultHeaders,
        headers
      },
      data
    });
    dispatch({ type: SUCCESS, response });
    return response;
  } catch (err) {
    dispatch({ type: FAILURE, err });
    throw err;
  }
}

export const useRequest = getOptions => {
  const [request, createRequest] = useRequest(getOptions);
  const { ready, cancel } = createRequest();
  return [async () => request().]
};
