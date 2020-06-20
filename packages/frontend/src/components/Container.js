import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withStyles, Grid, Hidden } from "@material-ui/core";

const styles = theme => ({
  container: {
    margin: 0,
    width: "100%"
  },
  spaced: {
    paddingTop: "5em !important",
    paddingBottom: "5em !important"
  },
  inverted: {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff !important"
  }
});

const Container = ({
  children,
  width,
  spaced,
  className,
  inverted,
  classes
}) => (
  <Grid
    container
    className={classnames(classes.container, { [classes.inverted]: inverted })}
    spacing={2}
    alignItems="center"
  >
    <Hidden smDown>
      <Grid item sm />
    </Hidden>
    <Grid
      item
      xs={12}
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
  inverted: PropTypes.bool,
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    spaced: PropTypes.string.isRequired
  }).isRequired
};

Container.defaultProps = {
  className: "",
  width: 8,
  spaced: false,
  inverted: false
};

export default withStyles(styles)(Container);
