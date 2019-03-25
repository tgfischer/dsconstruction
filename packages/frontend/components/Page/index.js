import React, { Fragment } from "react";
import PropTypes from "prop-types";

import NavBar from "../NavBar";
import CoreLayout from "../CoreLayout";

const Page = ({ children }) => (
  <Fragment>
    <NavBar title="D's Construction" />
    <CoreLayout>{children}</CoreLayout>
  </Fragment>
);

Page.propTypes = {
  children: PropTypes.node.isRequired
};

export default Page;
