import React from "react";
import PropTypes from "prop-types";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import {
  Grid,
  Typography,
  TextField,
  Avatar,
  CircularProgress,
  Button
} from "@material-ui/core";

import Page from "../Page";
import Container from "../Container";
import { useLogin } from "./hooks";

const styles = theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(5)
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main
  },
  textField: {
    width: "100%"
  },
  submit: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
});

const Login = ({ classes, history }) => {
  const [onSubmit, { email, password }, isValid, isLoading] = useLogin(history);

  return (
    <Page title="D's Construction - Login">
      <Container width={4}>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
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
            {isLoading && <CircularProgress size={30} color="secondary" />}
            {!isLoading && <span>Login</span>}
          </Button>
        </form>
      </Container>
    </Page>
  );
};

Login.propTypes = {
  classes: PropTypes.shape({
    textField: PropTypes.string.isRequired,
    form: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    submit: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired
};

export default withStyles(styles)(withRouter(Login));