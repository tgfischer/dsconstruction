import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Button from "@material-ui/core/Button";

const NavBar = ({ to, children, ...props }) => (
  <Link href={to}>
    <Button {...props}>{children}</Button>
  </Link>
);

NavBar.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default NavBar;
