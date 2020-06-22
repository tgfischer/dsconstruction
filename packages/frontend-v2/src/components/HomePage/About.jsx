import React from "react";
import PropTypes from "prop-types";

import { Section } from "./Section";

export const About = ({ children }) => (
  <Section className="text-justify">
    <p className="lead">{children}</p>
  </Section>
);

About.propTypes = {
  children: PropTypes.node.isRequired
};
