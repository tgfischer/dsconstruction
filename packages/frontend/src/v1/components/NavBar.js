import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Hidden,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";

import { pages } from "../../constants";
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
    marginLeft: theme.spacing(1)
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
                alt="D's Construction"
                height="75px"
                width="auto"
              />
              <Typography
                className={classes.flex}
                variant="h6"
                color="inherit"
              />
              <Hidden smDown>
                {Object.keys(pages).map(key => (
                  <ButtonLink
                    key={pages[key].to}
                    to={pages[key].to}
                    className={classes.button}
                  >
                    {pages[key].name}
                  </ButtonLink>
                ))}
                {!isLoggedIn && (
                  <ButtonLink
                    className={classes.button}
                    to="/login"
                    variant="outlined"
                  >
                    Login
                  </ButtonLink>
                )}
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