import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import NavBar from "./NavBar";

const getBackgroundStyle = ({ background }) => ({
  background: {
    background: background
      ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${background}) no-repeat center center`
      : undefined
  }
});

const styles = theme => ({
  masthead: {
    height: 600
  },
  background: {
    backgroundSize: "cover !important"
  },
  title: {
    fontWeight: 700,
    color: theme.palette.common.white
  },
  subtitle: {
    fontWeight: 400,
    color: theme.palette.common.white
  }
});

const Masthead = ({ background, classes }) => (
  <div
    className={classnames(classes.masthead, classes.background)}
    style={getBackgroundStyle({ background }).background}
  >
    <NavBar title="D's Construction" transparent />
    <Grid
      className={classes.masthead}
      direction="column"
      justify="center"
      alignItems="center"
      container
    >
      <Grid item>
        <Typography variant="h2" className={classes.title}>
          {"D's Construction"}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" className={classes.subtitle}>
          {"Walkerton, Ontario"}
        </Typography>
      </Grid>
    </Grid>
  </div>
);

Masthead.propTypes = {
  background: PropTypes.string,
  classes: PropTypes.shape({
    masthead: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(Masthead);
