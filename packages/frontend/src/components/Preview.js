import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";

import Container from "./Container";
import LoadingSpinner from "./LoadingSpinner";

const styles = theme => ({
  action: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
});

const Preview = ({ title, Action, isLoading, classes, children }) => (
  <Container spaced>
    {title && (
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>
    )}
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
  title: PropTypes.string,
  Action: PropTypes.func,
  isLoading: PropTypes.bool,
  classes: PropTypes.shape({
    action: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.node.isRequired
};

Preview.defaultProps = {
  isLoading: false
};

const Wrapper = ({ skinny, inverted, ...props }) => (
  <Fragment>
    {skinny ? (
      <Container inverted={inverted} spaced>
        <Preview {...props} />
      </Container>
    ) : (
      <Preview {...props} />
    )}
  </Fragment>
);

Wrapper.propTypes = {
  skinny: PropTypes.bool,
  inverted: PropTypes.bool
};

Wrapper.defaultProps = {
  skinny: false,
  inverted: false
};

export default withStyles(styles)(Wrapper);
