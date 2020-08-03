import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import qs from "qs";

import { useSidebar } from "./hooks";

export const Sidebar = props => {
  const { links } = useSidebar(props);
  return (
    <ListGroup className="mb-4">
      {links.map(({ displayName, url, params = {}, isActive }) => (
        <ListGroup.Item
          key={url}
          as={Link}
          to={`${url}?${qs.stringify(params)}`}
          active={isActive}
        >
          {displayName}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
