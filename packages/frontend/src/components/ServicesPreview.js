import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import BuildIcon from "@material-ui/icons/Build";
import sortBy from "lodash/sortBy";
import { withStyles } from "@material-ui/core/styles";

import Preview from "./Preview";

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit * 1.5,
    fontSize: theme.typography.fontSize
  }
});

const ServicesPreview = ({ services, classes }) => (
  <Preview title="Services">
    <Grid spacing={16} justify="center" container>
      {sortBy(services, ["name"]).map(({ name }) => (
        <Chip
          key={name}
          className={classes.chip}
          label={name}
          avatar={
            <Avatar>
              <BuildIcon />
            </Avatar>
          }
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
  )
};

ServicesPreview.defaultProps = {
  services: []
};

export default withStyles(styles)(ServicesPreview);
