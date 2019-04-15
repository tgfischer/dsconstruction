import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import Container from "./Container";
import LoadingSpinner from "./LoadingSpinner";

const styles = theme => ({
  action: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  title: {
    textTransform: "inherit"
  }
});

const Preview = ({ title, Action, isLoading, classes, children }) => (
  <Container spaced>
    <Typography className={classes.title} variant="h3" gutterBottom>
      {title}
    </Typography>
    {isLoading && <LoadingSpinner />}
    {!isLoading && <Fragment>{children}</Fragment>}
    {Action && (
      <Grid justify="flex-end" container>
        <Grid className={classes.action} item>
          <Action />
        </Grid>
      </Grid>
    )}
  </Container>
);

Preview.propTypes = {
  title: PropTypes.string.isRequired,
  Action: PropTypes.func,
  isLoading: PropTypes.bool,
  classes: PropTypes.shape({
    action: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.node.isRequired
};

Preview.defaultProps = {
  isLoading: false
};

export default withStyles(styles)(Preview);
