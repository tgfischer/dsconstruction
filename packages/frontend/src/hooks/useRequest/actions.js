import axios from "axios";

import * as constants from "./constants";

const action = async (dispatch, { onSuccess, onFailure, ...request }) => {
  try {
    dispatch({ type: constants.REQUEST });
    const rawResponse = await axios(request);
    const response = onSuccess(rawResponse);
    dispatch({ type: constants.SUCCESS, response });
    return response;
  } catch (err) {
    dispatch({ type: constants.FAILURE, err: onFailure(err) });
  }
};

export default action;
