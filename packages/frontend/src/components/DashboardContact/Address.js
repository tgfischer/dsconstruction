import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import { useAddress } from "./hooks";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 3
  }
});

const Address = ({ classes }) => {
  const [address, onChange] = useAddress();
  return (
    <Paper className={classes.paper}>
      <Grid spacing={16} container>
        <Grid xs={12} item>
          <Typography variant="h5">Edit address</Typography>
        </Grid>
        <Grid xs={12} item>
          <Grid spacing={16} container>
            <Grid xs={12} item>
              <TextField
                label="Street"
                variant="outlined"
                fullWidth
                required
                value={address.street}
                onChange={onChange("street")}
              />
            </Grid>
            <Grid sm={4} xs={12} item>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                required
                value={address.city}
                onChange={onChange("city")}
              />
            </Grid>
            <Grid sm={4} xs={12} item>
              <TextField
                label="Province"
                variant="outlined"
                fullWidth
                required
                value={address.province}
                onChange={onChange("province")}
              />
            </Grid>
            <Grid sm={4} xs={12} item>
              <TextField
                label="Postal code"
                variant="outlined"
                fullWidth
                required
                value={address.postalCode}
                onChange={onChange("postalCode")}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

Address.propTypes = {
  classes: PropTypes.shape({
    paper: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(Address);
