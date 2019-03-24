import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

import NavBar from "../NavBar";

const Page = ({ children }) => (
  <Fragment>
    <NavBar title="D's Construction" />
    <Grid container>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  </Fragment>
);

Page.propTypes = {
  children: PropTypes.node.isRequired
};

export default Page;
