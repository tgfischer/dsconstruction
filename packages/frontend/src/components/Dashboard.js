import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";

import Page from "./Page";
import SideNav from "./SideNav";

const Container = styled.div`
  padding: 16px;
`;

const styles = theme => ({
  divider: {
    marginBottom: theme.spacing.unit * 4
  }
});

const Dashboard = ({ title, classes, children }) => (
  <Page fixed>
    <SideNav />
    <Container>
      <Typography variant="h4">{title}</Typography>
      <Divider className={classes.divider} />
      {children}
    </Container>
  </Page>
);

Dashboard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({
    divider: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(Dashboard);
