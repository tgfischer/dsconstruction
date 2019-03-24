import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core/styles";

import { pages } from "../../constants";
import Container from "../Container";

const styles = theme => ({
  flex: {
    flex: 1
  },
  menuButton: {
    marginRight: "20px"
  },
  button: {
    color: theme.palette.common.white
  }
});

const NavBar = ({ title, classes }) => (
  <AppBar position="static" color="secondary">
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
              <Link key={href} href={href}>
                <Button className={classes.button}>{label}</Button>
              </Link>
            ))}
          </Hidden>
        </Grid>
      </Container>
    </Toolbar>
  </AppBar>
);

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    flex: PropTypes.string.isRequired,
    menuButton: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(NavBar);
