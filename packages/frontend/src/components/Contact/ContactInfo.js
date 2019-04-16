import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import PhoneIcon from "@material-ui/icons/Phone";
import PlaceIcon from "@material-ui/icons/Place";
import EmailIcon from "@material-ui/icons/Email";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { ContactContext } from "../../contexts/ContactProvider";
import LoadingSpinner from "../LoadingSpinner";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2
  },
  subtitle: {
    marginBottom: theme.spacing.unit * 5
  },
  email: {
    wordBreak: "break-word"
  }
});

const ContactForm = ({ classes }) => {
  const [{ phoneNumbers, address, email, isLoading }] = useContext(
    ContactContext
  );
  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <Paper className={classes.paper}>
      <Grid spacing={16} container>
        <Grid xs={12} item>
          <Typography variant="h6">Phone numbers</Typography>
          <List>
            {phoneNumbers.map(({ name, number }) => (
              <ListItem key={number}>
                <Avatar>
                  <PhoneIcon />
                </Avatar>
                <ListItemText primary={number} secondary={name} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid xs={12} item>
          <Typography variant="h6">Email</Typography>
          <ListItem>
            <Avatar>
              <EmailIcon />
            </Avatar>
            <ListItemText className={classes.email} primary={email} />
          </ListItem>
        </Grid>
        <Grid xs={12} item>
          <Typography variant="h6">Address</Typography>
          <ListItem>
            <Avatar>
              <PlaceIcon />
            </Avatar>
            <ListItemText
              primary={
                <Fragment>
                  <Typography variant="body1">{address.street}</Typography>
                  <Typography variant="body1">
                    {address.city}, {address.province}
                  </Typography>
                  <Typography variant="body1">{address.postalCode}</Typography>
                </Fragment>
              }
            />
          </ListItem>
        </Grid>
      </Grid>
    </Paper>
  );
};

ContactForm.propTypes = {
  classes: PropTypes.shape({
    paper: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(ContactForm);
