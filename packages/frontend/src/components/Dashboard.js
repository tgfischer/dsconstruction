import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Page from "./Page";
import SideNav from "./SideNav";

const Container = styled.div`
  padding: 16px;
`;

const Dashboard = ({ title, classes, children }) => (
  <Page title={title} fixed>
    <SideNav />
    <Container>{children}</Container>
  </Page>
);

Dashboard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({
    divider: PropTypes.string.isRequired
  }).isRequired
};

export default Dashboard;
