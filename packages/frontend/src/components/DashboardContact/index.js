import React from "react";
import Grid from "@material-ui/core/Grid";

import Dashboard from "../Dashboard";
import PhoneNumbers from "./PhoneNumbers";
import ContactProvider from "../../contexts/ContactProvider";

const DashboardContact = () => (
  <ContactProvider>
    <Dashboard title="Contact settings">
      <Grid spacing={16} container>
        <Grid xs={12} item>
          <PhoneNumbers />
        </Grid>
      </Grid>
    </Dashboard>
  </ContactProvider>
);

export default DashboardContact;
