import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { pages, adminPages } from "../constants";
import useSidebar from "../hooks/useSidebar";
import useUser from "../hooks/useUser";
import StyledLink from "./StyledLink";

const styles = {
  list: {
    width: 250,
    backgroundColor: "white"
  }
};

const Sidebar = ({ classes, isOpen, closeSidebar, isLoggedIn, clearUser }) => (
  <SwipeableDrawer open={isOpen} onClose={closeSidebar}>
    <List className={classes.list}>
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
      {isLoggedIn && (
        <Fragment>
          <Divider />
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
