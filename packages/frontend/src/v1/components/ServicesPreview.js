import React from "react";
import PropTypes from "prop-types";
import sortBy from "lodash/sortBy";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Chip } from "@material-ui/core";

import Preview from "./Preview";

const styles = theme => ({
  chip: {
    margin: theme.spacing(1),
    fontSize: theme.typography.fontSize * 1.3
  }
});

const ServicesPreview = ({ services, classes }) => (
  <Preview title="Services">
    <Grid container>
      {sortBy(services, ["name"]).map(({ name }) => (
        <Chip
          key={name}
          className={classes.chip}
          label={name}
          variant="outlined"
        />
      ))}
    </Grid>
  </Preview>
);

ServicesPreview.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ),
  classes: PropTypes.shape({
    chip: PropTypes.string.isRequired
  }).isRequired
};

ServicesPreview.defaultProps = {
  services: []
};

export default withStyles(styles)(ServicesPreview);
