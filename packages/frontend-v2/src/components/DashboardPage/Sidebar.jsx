import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useSidebar } from "./hooks";

export const Sidebar = props => {
  const { links } = useSidebar(props);
  return (
    <ListGroup>
      {links.map(({ displayName, url, isActive }) => (
        <ListGroup.Item key={url} as={Link} to={url} active={isActive}>
          {displayName}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
