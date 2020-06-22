import React from "react";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";

import { Layout } from "components/Layout";
import { Navbar } from "components/Navbar";
import { Spinner } from "components/Spinner";

export const Page = ({ title, navbarVariant, isLoading, children }) => (
  <Layout>
    <Navbar className="mb-5" variant={navbarVariant} />
    <Container>
      {title && <h2 className="mb-3">{title}</h2>}
      {isLoading ? <Spinner /> : <>{children}</>}
    </Container>
  </Layout>
);

Page.propTypes = {
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  navbarVariant: PropTypes.oneOf(["transparent", "dark"]),
  children: PropTypes.node.isRequired
};

Page.defaultProps = {
  isLoading: false,
  navbarVariant: "dark"
};
