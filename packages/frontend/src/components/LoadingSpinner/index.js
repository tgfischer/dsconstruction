import React from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingSpinner = () => (
  <Grid container justify="center" alignItems="center">
    <CircularProgress size={100} color="secondary" disableShrink />
  </Grid>
);

export default LoadingSpinner;
