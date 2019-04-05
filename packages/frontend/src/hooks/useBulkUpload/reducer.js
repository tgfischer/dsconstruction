import * as constants from "./constants";

export default (state = { isUploading: false, isUploaded: false }, action) => {
  switch (action.type) {
    case constants.SET_IS_UPLOADING:
      return {
        isUploading: true,
        isUploaded: false
      };
    case constants.REQUEST:
      return {
        data: action.data,
        isUploading: true,
        isUploaded: false
      };
    case constants.SUCCESS:
      return {
        ...state,
        response: action.response,
        isUploading: false,
        isUploaded: true
      };
    case constants.FAILURE:
      return {
        err: action.err,
        isUploading: false,
        isUploaded: false
      };
    default:
      return state;
  }
};
