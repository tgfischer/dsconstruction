import React from "react";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core/styles";

import { adminPages } from "../constants";
import StyledLink from "./StyledLink";

const styles = theme => ({
  root: {
    width: 240,
    flexShrink: 0
  },
  paper: {
    width: 240
  },
  toolbar: {
    height: 91
  }
});

const SideNav = ({ classes }) => (
  <Hidden smDown>
    <Drawer
      className={classes.root}
      classes={{ paper: classes.paper }}
      variant="permanent"
      anchor="left"
    >
      <div className={classes.toolbar} />
      <List>
        {Object.keys(adminPages).map(key => {
          const Icon = adminPages[key].icon;
          return (
            <StyledLink key={key} to={adminPages[key].to}>
              <ListItem button>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText>{adminPages[key].name}</ListItemText>
              </ListItem>
            </StyledLink>
          );
        })}
      </List>
    </Drawer>
  </Hidden>
);

SideNav.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    paper: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(SideNav);
