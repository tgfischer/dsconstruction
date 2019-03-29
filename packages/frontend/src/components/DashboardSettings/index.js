import React from "react";

import Dashboard from "../Dashboard";
import useUser from "../../hooks/useUser";

const DashboardSettings = () => {
  const [{ user }] = useUser();
  return (
    <Dashboard>
      {user.firstName} {user.lastName}
    </Dashboard>
  );
};

export default DashboardSettings;
