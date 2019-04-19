import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import { useAbout } from "./hooks";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 3
  }
});

const About = ({ classes }) => {
  const [about, onChange] = useAbout();
  return (
    <Paper className={classes.paper}>
      <Grid spacing={16} container>
        <Grid xs={12} item>
          <Typography variant="h5">Edit about</Typography>
        </Grid>
        <Grid xs={12} item>
          <TextField
            label="About"
            variant="outlined"
            fullWidth
            required
            value={about}
            onChange={onChange}
            multiline
            rows={10}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

About.propTypes = {
  classes: PropTypes.shape({
    paper: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(About);
