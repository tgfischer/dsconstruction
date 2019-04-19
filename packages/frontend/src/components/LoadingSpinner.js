import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  grid: {
    height: "100vh"
  }
});

const LoadingSpinner = ({ padding, fullHeight, classes }) => (
  <Grid
    container
    className={classnames({ [classes.grid]: fullHeight })}
    style={{ padding: padding + "em" }}
    justify="center"
    alignItems="center"
  >
    <CircularProgress size={100} color="secondary" disableShrink />
  </Grid>
);

LoadingSpinner.propTypes = {
  padding: PropTypes.number.isRequired,
  fullHeight: PropTypes.bool,
  classes: PropTypes.shape({
    grid: PropTypes.string.isRequired
  }).isRequired
};

LoadingSpinner.defaultProps = {
  padding: 0,
  fullHeight: false
};

export default withStyles(styles)(LoadingSpinner);
