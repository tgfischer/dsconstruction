import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Page from "../Page";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import ContactProvider from "../../contexts/ContactProvider";

const styles = theme => ({
  subtitle: {
    marginBottom: theme.spacing.unit * 5
  }
});

const Contact = ({ classes }) => (
  <ContactProvider>
    <Page title="Contact Us" fixed>
      <Typography className={classes.subtitle} variant="h5" gutterBottom>
        Interested in any of our services? Send us a message to get a quote
      </Typography>
      <Grid spacing={16} container>
        <Grid sm={8} xs={12} item>
          <ContactForm />
        </Grid>
        <Grid sm={4} xs={12} item>
          <ContactInfo />
        </Grid>
      </Grid>
    </Page>
  </ContactProvider>
);

Contact.propTypes = {
  classes: PropTypes.shape({
    subtitle: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(Contact);
