import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  container: {
    margin: 0,
    width: "100%"
  },
  spaced: {
    paddingTop: "4em !important",
    paddingBottom: "4em !important"
  }
});

const Container = ({ children, width, spaced, className, classes }) => (
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
      md={width}
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
  width: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  spaced: PropTypes.bool,
  className: PropTypes.string,
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    spaced: PropTypes.string.isRequired
  }).isRequired
};

Container.defaultProps = {
  className: "",
  width: 8,
  spaced: false
};

export default withStyles(styles)(Container);
