import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core/styles";

import { pages } from "../../constants";
import Container from "../Container";
import ButtonLink from "../ButtonLink";

const styles = theme => ({
  flex: {
    flex: 1
  },
  menuButton: {
    marginRight: "20px"
  },
  button: {
    color: theme.palette.common.white
  },
  transparent: {
    background: "transparent",
    boxShadow: "none"
  }
});

const NavBar = ({ title, transparent, classes }) => (
  <AppBar
    className={classnames({ [classes.transparent]: transparent })}
    position="static"
    color="secondary"
  >
    <Toolbar>
      <Container>
        <Grid container alignItems="center">
          <Hidden mdUp>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography className={classes.flex} variant="h6" color="inherit">
            {title}
          </Typography>
          <Hidden smDown>
            {pages.map(({ label, href }) => (
              <ButtonLink key={href} to={href} className={classes.button}>
                {label}
              </ButtonLink>
            ))}
          </Hidden>
        </Grid>
      </Container>
    </Toolbar>
  </AppBar>
);

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
  transparent: PropTypes.bool,
  classes: PropTypes.shape({
    flex: PropTypes.string.isRequired,
    menuButton: PropTypes.string.isRequired
  }).isRequired
};

NavBar.defaultProps = {
  transparent: false
};

export default withStyles(styles)(NavBar);
