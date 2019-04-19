import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";

import NavBar from "./NavBar";
import CoreLayout from "./CoreLayout";
import Container from "./Container";

const styles = theme => ({
  header: {
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit
  },
  divider: {
    marginBottom: theme.spacing.unit * 3
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
