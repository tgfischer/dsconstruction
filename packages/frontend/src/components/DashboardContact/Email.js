import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, TextField } from "@material-ui/core";

import { useEmail } from "./hooks";

const styles = theme => ({
  paper: {
    padding: theme.spacing(3)
  }
});

const Email = ({ classes }) => {
  const [email, onChange] = useEmail();
  return (
    <Paper className={classes.paper}>
      <Grid spacing={2} container>
        <Grid xs={12} item>
          <Typography variant="h5">Edit email</Typography>
        </Grid>
        <Grid xs={12} item>
          <Grid spacing={2} container>
            <Grid xs={12} item>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                required
                value={email}
                onChange={onChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

Email.propTypes = {
  classes: PropTypes.shape({
    paper: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(Email);
