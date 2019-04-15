import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import ReCAPTCHA from "react-google-recaptcha";
import { withStyles } from "@material-ui/core/styles";

import { useContactForm } from "./hooks";

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit
  }
});

const ContactForm = ({ classes }) => {
  const { input, isLoading } = useContactForm();
  return (
    <Grid spacing={16} container>
      <Grid sm={6} xs={12} item>
        <TextField
          label="First name"
          variant="outlined"
          fullWidth
          required
          {...input.text("firstName")}
          disabled={isLoading}
        />
      </Grid>
      <Grid sm={6} xs={12} item>
        <TextField
          label="Last name"
          variant="outlined"
          fullWidth
          required
          {...input.text("lastName")}
          disabled={isLoading}
        />
      </Grid>
      <Grid xs={12} item>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          {...input.email("email")}
          disabled={isLoading}
        />
      </Grid>
      <Grid xs={12} item>
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          required
          {...input.textarea("message")}
          disabled={isLoading}
          multiline
          rows={10}
        />
      </Grid>
      <Grid xs={12} item>
        <ReCAPTCHA
          sitekey="6LfaVp4UAAAAAP1kIoBcaWzOPkEXxkZ4rLj_0Y50"
          size="invisible"
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled={isLoading}
        >
          <SendIcon className={classes.icon} />
          Send
        </Button>
      </Grid>
    </Grid>
  );
};

ContactForm.propTypes = {
  classes: PropTypes.shape({
    icon: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(ContactForm);
