import React from "react";
import {
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink
} from "@elastic/eui";
import { Container } from "react-bootstrap";

export const Navbar = () => (
  <EuiHeader className="ds-navbar" theme="dark">
    <Container>
      <EuiHeaderSectionItem border="right">
        <EuiHeaderLogo iconType="/images/logo.svg">
          D's Construction
        </EuiHeaderLogo>
      </EuiHeaderSectionItem>
      <EuiHeaderSectionItem>
        <EuiHeaderLinks aria-label="App navigation links example">
          <EuiHeaderLink isActive>Home</EuiHeaderLink>
          <EuiHeaderLink>Photo Gallery</EuiHeaderLink>
          <EuiHeaderLink>Contact</EuiHeaderLink>
        </EuiHeaderLinks>
      </EuiHeaderSectionItem>
    </Container>
  </EuiHeader>
);
