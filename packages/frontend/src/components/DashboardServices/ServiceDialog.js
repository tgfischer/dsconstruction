import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  content: {
    paddingTop: theme.spacing.unit
  },
  upload: {
    display: "none"
  }
});

const ServiceDialog = ({
  title,
  values,
  input,
  onSubmit,
  onClose,
  isOpen,
  isLoading,
  classes
}) => (
  <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent className={classes.content}>
      <Grid spacing={16} container>
        <Grid item sm={8} xs={12}>
          <Grid spacing={16} container>
            <Grid item xs={12}>
              <TextField
                label="Service name"
                variant="outlined"
                disabled={isLoading}
                fullWidth
                required
                {...input.text("name")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Brief description"
                variant="outlined"
                disabled={isLoading}
                fullWidth
                required
                {...input.text("blurb")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Full description"
                variant="outlined"
                rows="10"
                rowsMax="10"
                disabled={isLoading}
                fullWidth
                required
                multiline
                {...input.textarea("description")}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Grid spacing={16} container>
            <Grid xs={12} item>
              <Card>
                <CardMedia
                  component="img"
                  src={values.thumbnail || "/images/placeholder.jpg"}
                  alt={values.thumbnail || "/images/placeholder.jpg"}
                />
              </Card>
            </Grid>
            <Grid xs={12} item>
              <input
                id="upload"
                className={classes.upload}
                type="file"
                accept="image/*"
                multiple
              />
              <label htmlFor="upload">
                <Button component="span" className={classes.button}>
                  Browse
                </Button>
              </label>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions>
      <Button
        variant="contained"
        color="primary"
        disabled={isLoading}
        onClick={onSubmit}
      >
        {isLoading && <CircularProgress size={20} color="secondary" />}
        {!isLoading && "Save"}
      </Button>
      <Button onClick={onClose}>Cancel</Button>
    </DialogActions>
  </Dialog>
);

ServiceDialog.propTypes = {
  title: PropTypes.string.isRequired,
  values: PropTypes.shape({
    thumbnail: PropTypes.string
  }).isRequired,
  input: PropTypes.shape({
    text: PropTypes.func.isRequired,
    textarea: PropTypes.func.isRequired
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    content: PropTypes.string.isRequired,
    upload: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(ServiceDialog);
