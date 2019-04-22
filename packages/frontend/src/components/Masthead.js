import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
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
    height: "100vh"
  },
  background: {
    backgroundSize: "cover !important"
  },
  title: {
    fontWeight: 700,
    color: theme.palette.common.white,
    wordBreak: "break-word"
  },
  desktop: {
    fontSize: "3.5em"
  },
  mobile: {
    fontSize: "2em"
  },
  subtitle: {
    color: theme.palette.common.white
  }
});

const Masthead = ({ masthead, classes }) => (
  <div
    className={classnames(classes.masthead, classes.background)}
    style={getBackgroundStyle({ background: masthead.background }).background}
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
        <Hidden mdUp>
          <Typography
            variant="h1"
            className={classnames(classes.title, classes.mobile)}
          >
            {masthead.header}
          </Typography>
        </Hidden>
        <Hidden mdDown>
          <Typography
            variant="h1"
            className={classnames(classes.title, classes.desktop)}
          >
            {masthead.header}
          </Typography>
        </Hidden>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" className={classes.subtitle}>
          {masthead.subHeader}
        </Typography>
      </Grid>
    </Grid>
  </div>
);

Masthead.propTypes = {
  masthead: PropTypes.shape({
    background: PropTypes.string,
    header: PropTypes.string,
    subHeader: PropTypes.string
  }).isRequired,
  classes: PropTypes.shape({
    masthead: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(Masthead);
