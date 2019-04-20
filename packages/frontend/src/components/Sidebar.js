import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import * as constants from "../constants";
import useSidebar from "../hooks/useSidebar";
import useUser from "../hooks/useUser";

const styles = {
  list: {
    width: 250,
    backgroundColor: "white"
  }
};

const Sidebar = ({ classes, isOpen, closeSidebar, isLoggedIn, clearUser }) => (
  <SwipeableDrawer open={isOpen} onClose={closeSidebar}>
    <List className={classes.list}>
      {constants.pages.map(({ href, label }) => (
        <ListItem
          key={href}
          component={Link}
          to={href}
          onClick={closeSidebar}
          button
        >
          <ListItemText primary={label} />
        </ListItem>
      ))}
      {isLoggedIn && (
        <Fragment>
          {constants.adminPages.map(({ href, label }) => (
            <ListItem
              key={href}
              component={Link}
              to={href}
              onClick={closeSidebar}
              button
            >
              <ListItemText primary={label} />
            </ListItem>
          ))}
          <ListItem
            component={Link}
            onClick={() => {
              closeSidebar();
              clearUser();
            }}
            button
          >
            <ListItemText primary="Log out" />
          </ListItem>
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
