import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Divider } from "@material-ui/core";

import NavBar from "./NavBar";
import CoreLayout from "./CoreLayout";
import Container from "./Container";

const styles = theme => ({
  header: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(1)
  },
  divider: {
    marginBottom: theme.spacing(3)
  }
});

const Page = ({ title, header, fixed, classes, children }) => (
  <Fragment>
    <NavBar title="D's Construction" fixed={fixed} />
    <CoreLayout title={title}>
      {header && (
        <Fragment>
          <Container>
            <Typography className={classes.header} variant="h3">
              {header}
            </Typography>
          </Container>
          <Divider className={classes.divider} />
        </Fragment>
      )}
      <Container>{children}</Container>
    </CoreLayout>
  </Fragment>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  fixed: PropTypes.bool,
  title: PropTypes.string.isRequired,
  header: PropTypes.string,
  classes: PropTypes.shape({
    header: PropTypes.string.isRequired,
    divider: PropTypes.string.isRequired
  }).isRequired
};

Page.defaultProps = {
  fixed: false
};

export default withStyles(styles)(Page);
