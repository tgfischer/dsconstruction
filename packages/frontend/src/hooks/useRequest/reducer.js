import * as constants from "./constants";

const initialState = {
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.REQUEST:
      return {
        isLoading: true
      };
    case constants.SUCCESS:
      return {
        isLoading: false,
        response: action.response
      };
    case constants.FAILURE:
      return {
        isLoading: false,
        err: action.err
      };
    default:
      return state;
  }
};
