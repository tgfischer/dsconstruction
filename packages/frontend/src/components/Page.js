import React, { Fragment } from "react";
import PropTypes from "prop-types";

import NavBar from "./NavBar";
import CoreLayout from "./CoreLayout";
import Container from "./Container";

const Page = ({ fixed, children }) => (
  <Fragment>
    <NavBar title="D's Construction" fixed={fixed} />
    <CoreLayout>
      <Container>{children}</Container>
    </CoreLayout>
  </Fragment>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  fixed: PropTypes.bool
};

Page.defaultProps = {
  fixed: false
};

export default Page;
