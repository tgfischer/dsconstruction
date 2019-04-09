import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  loading: {
    paddingTop: theme.spacing.unit * 3
  }
});

const LoadingSpinner = ({ padding }) => (
  <Grid
    container
    style={{ padding: padding + "em" }}
    justify="center"
    alignItems="center"
  >
    <CircularProgress size={100} color="secondary" disableShrink />
  </Grid>
);

LoadingSpinner.propTypes = {
  padding: PropTypes.number.isRequired
};

LoadingSpinner.defaultProps = {
  padding: 0
};

export default withStyles(styles)(LoadingSpinner);
