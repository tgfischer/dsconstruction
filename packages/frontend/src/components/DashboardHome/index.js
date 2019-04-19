import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Dashboard from "../Dashboard";
import HomeProvider from "../../contexts/HomeProvider";
import { useDashboardHome } from "./hooks";
import Masthead from "./Masthead";
import About from "./About";

const DashboardHome = () => {
  const [state, handleSubmit, isLoading] = useDashboardHome();
  return (
    <Dashboard title="Home page settings" isLoading={isLoading}>
      <Grid spacing={16} container>
        <Grid xs={12} item>
          <Masthead />
        </Grid>
        <Grid xs={12} item>
          <About />
        </Grid>
        <Grid xs={12} item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => handleSubmit(state)}
            disabled={isLoading}
          >
            Save changes
          </Button>
        </Grid>
      </Grid>
    </Dashboard>
  );
};

const Wrapper = () => (
  <HomeProvider>
    <DashboardHome />
  </HomeProvider>
);

export default Wrapper;
