import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

const Page = ({ children }) => (
  <Grid container>
    <Grid item xs={12}>
      {children}
    </Grid>
  </Grid>
);

Page.propTypes = {
  children: PropTypes.node.isRequired
};

export default Page;
