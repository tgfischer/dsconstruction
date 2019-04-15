import React from "react";

import Dashboard from "../Dashboard";
import useUser from "../../hooks/useUser";

const DashboardHome = () => {
  const [{ user }] = useUser();
  return (
    <Dashboard title="Home page settings">
      {user.firstName} {user.lastName}
    </Dashboard>
  );
};

export default DashboardHome;
