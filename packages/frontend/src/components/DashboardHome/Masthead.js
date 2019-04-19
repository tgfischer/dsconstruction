import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import { useMasthead } from "./hooks";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 3
  }
});

const Email = ({ classes }) => {
  const [masthead, onChange] = useMasthead();
  return (
    <Paper className={classes.paper}>
      <Grid spacing={16} container>
        <Grid xs={12} item>
          <Typography variant="h5">Edit masthead</Typography>
        </Grid>
        <Grid xs={12} item>
          <Grid spacing={16} container>
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
