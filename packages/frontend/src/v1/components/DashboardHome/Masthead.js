import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, TextField } from "@material-ui/core";

import { useMasthead } from "./hooks";

const styles = theme => ({
  paper: {
    padding: theme.spacing(3)
  }
});

const Email = ({ classes }) => {
  const [masthead, onChange] = useMasthead();
  return (
    <Paper className={classes.paper}>
      <Grid spacing={2} container>
        <Grid xs={12} item>
          <Typography variant="h5">Edit masthead</Typography>
        </Grid>
        <Grid xs={12} item>
          <Grid spacing={2} container>
            <Grid xs={12} item>
              <TextField
                label="Header"
                variant="outlined"
                fullWidth
                required
                value={masthead.header}
                onChange={onChange("header")}
              />
            </Grid>
            <Grid xs={12} item>
              <TextField
                label="Sub header"
                variant="outlined"
                fullWidth
                required
                value={masthead.subHeader}
                onChange={onChange("subHeader")}
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
