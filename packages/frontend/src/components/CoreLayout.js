import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

const CoreLayout = ({ children }) => (
  <Grid container>
    <Grid item xs={12}>
      {children}
    </Grid>
  </Grid>
);

CoreLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default CoreLayout;
