import axios from "axios";

import * as constants from "./constants";

export default async (dispatch, data, onUpload, onError) => {
  try {
    dispatch({ type: constants.REQUEST, data });

    await Promise.all(
      data.map(({ url, file }) =>
        axios
          .put(url, file, {
            headers: {
              "Content-Type": file.type
            }
          })
          .then(onUpload)
      )
    );
    dispatch({ type: constants.SUCCESS });
  } catch (err) {
    dispatch({ type: constants.FAILURE, err });
    onError(err);
    throw err;
  }
};
