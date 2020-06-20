import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";

const rules = [
  "Must contain at least one uppercase letter",
  "Must contain at least one lowercase letter",
  "Must contain at least one special character",
  "Must contain at least one number",
  "Must be at least 8 characters long"
];

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
});

const PasswordRules = ({ classes }) => (
  <Paper className={classes.root}>
    <Typography variant="h5">Password Rules</Typography>
    <List>
      {rules.map(rule => (
        <ListItem key={rule}>
          <ListItemText primary={rule} />
        </ListItem>
      ))}
    </List>
  </Paper>
);

PasswordRules.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(PasswordRules);
