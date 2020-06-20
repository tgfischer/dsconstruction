import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip
} from "@material-ui/core";

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing(0.25)
  }
});

const TagsSelect = ({ tags, selectedTag, handleSelectTag, classes }) => (
  <FormControl className={classes.formControl}>
    <InputLabel htmlFor="select-multiple-chip">All categories</InputLabel>
    <Select
      value={selectedTag}
      onChange={handleSelectTag}
      input={<Input id="select-multiple-chip" />}
      renderValue={tag => (
        <div className={classes.chips}>
          <Chip key={tag} label={tag} className={classes.chip} />
        </div>
      )}
    >
      {tags.map(({ id, name }) => (
        <MenuItem key={id} value={name}>
          {name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

TagsSelect.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  selectedTag: PropTypes.string,
  handleSelectTag: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    formControl: PropTypes.string.isRequired,
    chips: PropTypes.string.isRequired,
    chip: PropTypes.string.isRequired
  }).isRequired
};

TagsSelect.defaultProps = {
  selectedTag: ""
};

export default withStyles(styles)(TagsSelect);
