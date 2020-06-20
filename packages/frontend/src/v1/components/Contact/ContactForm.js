import React from "react";
import PropTypes from "prop-types";
import ReCAPTCHA from "react-google-recaptcha";
import SendIcon from "@material-ui/icons/Send";
import { withStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button } from "@material-ui/core";

import { useContactForm } from "./hooks";

const styles = theme => ({
  icon: {
    marginRight: theme.spacing(1)
  }
});

const ContactForm = ({ classes }) => {
  const { input, handleRecaptcha, handleSubmit, isLoading } = useContactForm();
  return (
    <form>
      <Grid spacing={2} container>
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
            sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
            onChange={handleRecaptcha}
          />
        </Grid>
        <Grid xs={12} item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            <SendIcon className={classes.icon} />
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

ContactForm.propTypes = {
  classes: PropTypes.shape({
    icon: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(ContactForm);
