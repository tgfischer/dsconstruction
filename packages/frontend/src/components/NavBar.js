import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";

import { pages } from "../constants";
import Container from "./Container";
import ButtonLink from "./ButtonLink";
import useUser from "../hooks/useUser";
import useSidebar from "../hooks/useSidebar";

const styles = theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginRight: "20px"
  },
  button: {
    color: theme.palette.common.white,
    marginLeft: theme.spacing.unit
  },
  transparent: {
    background: "transparent",
    boxShadow: "none"
  },
  toolbar: {
    height: 91
  }
});

const NavBar = ({ title, transparent, classes, history, fixed }) => {
  const { isLoggedIn, clearUser } = useUser();
  const [, openSidebar] = useSidebar();
  return (
    <Fragment>
      <AppBar
        className={classnames(classes.root, {
          [classes.transparent]: transparent
        })}
        position={fixed ? "fixed" : "absolute"}
        color="secondary"
      >
        <Toolbar>
          <Container>
            <Grid container alignItems="center">
              <Hidden mdUp>
                <IconButton
                  className={classes.menuButton}
                  onClick={openSidebar}
                  color="inherit"
                  aria-label="Menu"
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
              <img
                src="/images/logo.png"
                alt="/images/logo.png"
                height="75px"
                width="auto"
              />
              <Typography
                className={classes.flex}
                variant="h6"
                color="inherit"
              />
              <Hidden smDown>
                {pages.map(({ label, href }) => (
                  <ButtonLink key={href} to={href} className={classes.button}>
                    {label}
                  </ButtonLink>
                ))}
                {isLoggedIn && (
                  <Fragment>
                    <ButtonLink to="/dashboard" className={classes.button}>
                      Dashboard
                    </ButtonLink>
                    <Button
                      onClick={() => {
                        clearUser();
                        history.push("/login");
                      }}
                      className={classes.button}
                      variant="outlined"
                    >
                      Log out
                    </Button>
                  </Fragment>
                )}
              </Hidden>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      {!transparent && <div className={classes.toolbar} />}
    </Fragment>
  );
};

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
  transparent: PropTypes.bool,
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    flex: PropTypes.string.isRequired,
    menuButton: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
    transparent: PropTypes.string.isRequired
  }).isRequired,
  fixed: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

NavBar.defaultProps = {
  transparent: false,
  fixed: false
};

export default withStyles(styles)(withRouter(NavBar));
