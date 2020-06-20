import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import useContactInfo from "../hooks/useContactInfo";

export const ContactContext = React.createContext();

const Provider = ({ children }) => {
  useContactInfo();
  return <Fragment>{children}</Fragment>;
};

Provider.propTypes = {
  children: PropTypes.node.isRequired
};

const ContactProvider = ({ children }) => (
  <ContactContext.Provider
    value={useState({
      phoneNumbers: [],
      address: {},
      isLoading: false
    })}
  >
    <Provider>{children}</Provider>
  </ContactContext.Provider>
);

ContactProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ContactProvider;
