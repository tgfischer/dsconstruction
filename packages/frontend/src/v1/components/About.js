import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

import Preview from "./Preview";

const styles = () => ({
  grid: {
    textAlign: "justify"
  },
  typography: {
    color: "#FFF"
  }
});

const About = ({ about, classes }) => (
  <Preview inverted skinny>
    <Grid className={classes.grid} spacing={2} justify="center" container>
      <Typography className={classes.typography} variant="h5">
        {about}
      </Typography>
    </Grid>
  </Preview>
);

About.propTypes = {
  about: PropTypes.string,
  classes: PropTypes.shape({
    grid: PropTypes.string.isRequired,
    typography: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(About);
