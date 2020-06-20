import * as constants from "./constants";

export default (
  state = { isUploading: false, isUploaded: false, progress: 0 },
  action
) => {
  switch (action.type) {
    case constants.SET_IS_UPLOADING:
      return {
        isUploading: true,
        isUploaded: false,
        progress: 0
      };
    case constants.PROGRESS:
      return {
        ...state,
        progress: state.progress + 1
      };
    case constants.REQUEST:
      return {
        data: action.data,
        progress: 0,
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
        progress: 0,
        isUploading: false,
        isUploaded: false
      };
    default:
      return state;
  }
};
