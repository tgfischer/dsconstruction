import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, TextField } from "@material-ui/core";

import { useAbout } from "./hooks";

const styles = theme => ({
  paper: {
    padding: theme.spacing(3)
  }
});

const About = ({ classes }) => {
  const [about, onChange] = useAbout();
  return (
    <Paper className={classes.paper}>
      <Grid spacing={2} container>
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
