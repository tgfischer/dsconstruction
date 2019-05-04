import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  dividerText: {
    margin: `5px 0 0 ${theme.spacing.unit * 2}px`
  }
});

const DividerText = ({ children, classes }) => (
  <li>
    <Typography
      className={classes.dividerText}
      color="textSecondary"
      variant="caption"
    >
      {children}
    </Typography>
  </li>
);

DividerText.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({
    dividerText: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(DividerText);
