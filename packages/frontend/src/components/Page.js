import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";

import NavBar from "./NavBar";
import CoreLayout from "./CoreLayout";
import Container from "./Container";

const styles = theme => ({
  title: {
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit
  },
  divider: {
    marginBottom: theme.spacing.unit * 3
  }
});

const Page = ({ title, fixed, classes, children }) => (
  <Fragment>
    <NavBar title="D's Construction" fixed={fixed} />
    <CoreLayout>
      <Container>
        {title && (
          <Typography className={classes.title} variant="h3">
            {title}
          </Typography>
        )}
      </Container>
      <Divider className={classes.divider} />
      <Container>{children}</Container>
    </CoreLayout>
  </Fragment>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  fixed: PropTypes.bool,
  title: PropTypes.string,
  classes: PropTypes.shape({
    title: PropTypes.string.isRequired,
    divider: PropTypes.string.isRequired
  }).isRequired
};

Page.defaultProps = {
  fixed: false
};

export default withStyles(styles)(Page);
