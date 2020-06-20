import React from "react";

import Authorizer from "./Authorizer";
import * as constants from "./constants";

export const roles = constants.roles;

export default (role, Component) => {
  return () => (
    <Authorizer role={role}>
      <Component />
    </Authorizer>
  );
};
