import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core";

const styles = () => ({
  container: {
    margin: 0,
    width: "100%"
  },
  spaced: {
    paddingTop: "4em !important",
    paddingBottom: "4em !important"
  }
});

const Container = ({ children, spaced, className, classes }) => (
  <Grid
    container
    className={classes.container}
    spacing={16}
    alignItems="center"
  >
    <Hidden smDown>
      <Grid item sm />
    </Hidden>
    <Grid
      item
      sm={12}
      md={8}
      className={classnames(className, { [classes.spaced]: spaced })}
    >
      {children}
    </Grid>
    <Hidden smDown>
      <Grid item sm />
    </Hidden>
  </Grid>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  spaced: PropTypes.bool,
  className: PropTypes.string,
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    spaced: PropTypes.string.isRequired
  }).isRequired
};

Container.defaultProps = {
  className: "",
  spaced: false
};

export default withStyles(styles)(Container);
