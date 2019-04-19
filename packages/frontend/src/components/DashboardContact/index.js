import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Dashboard from "../Dashboard";
import PhoneNumbers from "./PhoneNumbers";
import Address from "./Address";
import Email from "./Email";
import ContactProvider from "../../contexts/ContactProvider";
import { useDashboardContacts } from "./hooks";

const DashboardContact = () => {
  const [state, onSubmit, isLoading] = useDashboardContacts();
  return (
    <Dashboard title="Contact settings" isLoading={isLoading}>
      <Grid spacing={16} container>
        <Grid xs={12} item>
          <PhoneNumbers />
        </Grid>
        <Grid xs={12} item>
          <Address />
        </Grid>
        <Grid xs={12} item>
          <Email />
        </Grid>
        <Grid xs={12} item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => onSubmit(state)}
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
  <ContactProvider>
    <DashboardContact />
  </ContactProvider>
);

export default Wrapper;
