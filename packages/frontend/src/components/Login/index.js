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
import { withRouter } from "react-router";

import Page from "../Page";
import Container from "../Container";
import { useLogin } from "./hooks";

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

const Login = ({ classes, enqueueSnackbar, history }) => {
  const [onSubmit, { email, password }, isValid, isLoading] = useLogin(
    history,
    err =>
      enqueueSnackbar(err, {
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
                Login
              </Typography>
            </Grid>
            <Grid className={classes.textField} xs={12} item>
              <TextField
                label="Email"
                variant="outlined"
                autoFocus
                fullWidth
                required
                {...email("email")}
                disabled={isLoading}
              />
            </Grid>
            <Grid className={classes.textField} xs={12} item>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                required
                {...password("password")}
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
            {!isLoading && <span>Login</span>}
          </Button>
        </form>
      </Container>
    </Page>
  );
};

Login.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired,
  classes: PropTypes.shape({
    textField: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(withSnackbar(withRouter(Login)));
