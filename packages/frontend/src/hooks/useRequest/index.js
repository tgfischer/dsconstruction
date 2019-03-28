import { useReducer } from "react";

import action from "./action";
import reducer from "./reducer";

export default request => {
  const [state, dispatch] = useReducer(reducer);
  return [state, () => action(dispatch, request)];
};
