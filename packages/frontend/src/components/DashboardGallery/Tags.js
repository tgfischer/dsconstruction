import React, { Fragment } from "react";
import PropTypes from "prop-types";
import sortBy from "lodash/sortBy";
import { withStyles } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";

const styles = theme => ({
  chip: {
    margin: theme.spacing(1)
  }
});

const Tags = ({ tags, onDelete, classes }) => (
  <Fragment>
    {sortBy(tags, ["name"]).map(({ id, name }) => (
      <Chip
        key={id}
        className={classes.chip}
        label={name}
        onDelete={() => onDelete({ id })}
      />
    ))}
  </Fragment>
);

Tags.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    chip: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(Tags);
