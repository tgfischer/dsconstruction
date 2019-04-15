import React from "react";

import Dashboard from "../Dashboard";
import useUser from "../../hooks/useUser";

const DashboardSettings = () => {
  const [{ user }] = useUser();
  return (
    <Dashboard title="General settings">
      {user.firstName} {user.lastName}
    </Dashboard>
  );
};

export default DashboardSettings;
