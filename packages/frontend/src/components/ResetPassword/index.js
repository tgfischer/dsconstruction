import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";

import Page from "../Page";
import Container from "../Container";
import PasswordRules from "./PasswordRules";
import useResetPassword from "./hooks";

const styles = theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit * 5
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main
  },
  textField: {
    width: "100%"
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  }
});

const ResetPassword = ({ classes, enqueueSnackbar, match }) => {
  const [onSubmit, { password }, isValid, isLoading] = useResetPassword(
    match.params.type,
    message =>
      enqueueSnackbar(message, {
        variant: "error",
        preventDuplicate: true
      })
  );

  return (
    <Page>
      <Container width={4}>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid
            direction="column"
            justify="center"
            alignItems="center"
            spacing={16}
            container
          >
            <Grid item>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h4" gutterBottom>
                Reset Password
              </Typography>
            </Grid>
            <Grid className={classes.textField} xs={12} item>
              <TextField
                label="New Password"
                variant="outlined"
                autoFocus
                fullWidth
                required
                {...password("password")}
                disabled={isLoading}
              />
            </Grid>
            <Grid className={classes.textField} xs={12} item>
              <TextField
                label="Confirm Password"
                variant="outlined"
                fullWidth
                required
                {...password({
                  name: "confirmPassword",
                  validate: (value, { password }) => value === password
                })}
                disabled={isLoading}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            className={classes.submit}
            disabled={!isValid || isLoading}
            fullWidth
          >
            {isLoading && <CircularProgress />}
            {!isLoading && <span>Reset Password</span>}
          </Button>
        </form>
        <PasswordRules />
      </Container>
    </Page>
  );
};

ResetPassword.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      type: PropTypes.oneOf(["temporary"]).isRequired
    }).isRequired
  }).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    textField: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(withSnackbar(ResetPassword));