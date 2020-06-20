import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Page from "./Page";
import SideNav from "./SideNav";
import LoadingSpinner from "./LoadingSpinner";

const Container = styled.div`
  padding: 16px;
`;

const Dashboard = ({ title, isLoading, children }) => (
  <Page title={`D's Construction - ${title}`} header={title} fixed>
    <SideNav />
    <Container>
      {isLoading ? <LoadingSpinner /> : <Fragment>{children}</Fragment>}
    </Container>
  </Page>
);

Dashboard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool
};

Dashboard.defaultProps = {
  isLoading: false
};

export default Dashboard;
