import React from "react";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { social } from "components/Navbar";

export const Footer = () => (
  <div className="border-top pt-3 pb-3 mt-3">
    <Container className="d-flex justify-content-between align-items-center">
      <p className="text-muted mb-0">
        © D's Construction. All rights reserved.
      </p>
      {social.map(({ icon, url }) => (
        <Button
          key={url}
          as="a"
          href={url}
          className="mr-2"
          variant="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={icon} size="lg" />
        </Button>
      ))}
    </Container>
  </div>
);
