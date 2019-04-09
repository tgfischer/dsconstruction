import React from "react";
import PropTypes from "prop-types";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  }
});

const TagsSelect = ({ tags, selectedTags, handleSelectTag, classes }) => (
  <FormControl className={classes.formControl}>
    <InputLabel htmlFor="select-multiple-chip">All categories</InputLabel>
    <Select
      multiple
      value={selectedTags}
      onChange={handleSelectTag}
      input={<Input id="select-multiple-chip" />}
      renderValue={selected => (
        <div className={classes.chips}>
          {selected.map(tag => (
            <Chip key={tag} label={tag} className={classes.chip} />
          ))}
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
  selectedTags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  handleSelectTag: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    formControl: PropTypes.string.isRequired,
    chips: PropTypes.string.isRequired,
    chip: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(TagsSelect);
