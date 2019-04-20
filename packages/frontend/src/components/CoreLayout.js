import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Grid from "@material-ui/core/Grid";

import Sidebar from "./Sidebar";

const CoreLayout = ({ title, children }) => (
  <Fragment>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <Sidebar />
    <Grid container>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  </Fragment>
);

CoreLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default CoreLayout;
