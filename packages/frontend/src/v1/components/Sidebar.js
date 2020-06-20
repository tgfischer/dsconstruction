import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { pages, adminPages } from "../../constants";
import useSidebar from "../hooks/useSidebar";
import useUser from "../hooks/useUser";
import StyledLink from "./StyledLink";
import DividerText from "./DividerText";

import {
  Drawer as SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from "@material-ui/core";

const styles = theme => ({
  list: {
    width: 250,
    backgroundColor: "white"
  }
});

const Sidebar = ({ classes, isOpen, closeSidebar, isLoggedIn, clearUser }) => (
  <SwipeableDrawer open={isOpen} onClose={closeSidebar}>
    <List className={classes.list}>
      <DividerText>D's Construction</DividerText>
      {Object.keys(pages).map(key => {
        const Icon = pages[key].icon;
        return (
          <StyledLink key={key} to={pages[key].to}>
            <ListItem onClick={closeSidebar} button>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText>{pages[key].name}</ListItemText>
            </ListItem>
          </StyledLink>
        );
      })}
      {!isLoggedIn && (
        <StyledLink to="/login">
          <ListItem onClick={closeSidebar} button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Login</ListItemText>
          </ListItem>
        </StyledLink>
      )}
      {isLoggedIn && (
        <Fragment>
          <Divider component="li" />
          <DividerText>Settings</DividerText>
          {Object.keys(adminPages).map(key => {
            const Icon = adminPages[key].icon;
            return (
              <StyledLink key={key} to={adminPages[key].to}>
                <ListItem onClick={closeSidebar} button>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText>{adminPages[key].name}</ListItemText>
                </ListItem>
              </StyledLink>
            );
          })}
          <Divider />
          <StyledLink to="/login">
            <ListItem
              onClick={() => {
                closeSidebar();
                clearUser();
              }}
              button
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText>Log out</ListItemText>
            </ListItem>
          </StyledLink>
        </Fragment>
      )}
    </List>
  </SwipeableDrawer>
);

Sidebar.propTypes = {
  classes: PropTypes.shape({
    list: PropTypes.string.isRequired
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  openSidebar: PropTypes.func.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  clearUser: PropTypes.func.isRequired
};

const Wrapper = props => {
  const [isOpen, openSidebar, closeSidebar] = useSidebar();
  const { isLoggedIn, clearUser } = useUser();
  return (
    <Sidebar
      {...props}
      isOpen={isOpen}
      openSidebar={openSidebar}
      closeSidebar={closeSidebar}
      isLoggedIn={isLoggedIn}
      clearUser={clearUser}
    />
  );
};

export default withStyles(styles)(Wrapper);
