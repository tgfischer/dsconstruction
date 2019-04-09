import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Page from "./Page";
import SideNav from "./SideNav";

const Container = styled.div`
  padding: 16px;
`;

const Dashboard = ({ children }) => (
  <Page fixed>
    <SideNav />
    <Container>{children}</Container>
  </Page>
);

Dashboard.propTypes = {
  children: PropTypes.node.isRequired
};

export default Dashboard;
