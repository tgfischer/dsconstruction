import React from "react";
import PropTypes from "prop-types";
import {
  faInbox,
  faPhoneAlt,
  faAddressCard
} from "@fortawesome/free-solid-svg-icons";

import { InformationSection } from "./InformationSection";
import { InformationItem } from "./InformationItem";

export const Information = ({ phoneNumbers, email, address }) => (
  <>
    <InformationSection title="Phone numbers">
      {phoneNumbers.map(({ name, number }) => (
        <InformationItem key={name} icon={faPhoneAlt}>
          <p className="m-0">{name}</p>
          <p className="m-0">{number}</p>
        </InformationItem>
      ))}
    </InformationSection>
    <InformationSection title="Email">
      <InformationItem icon={faInbox}>
        <p className="m-0">{email}</p>
      </InformationItem>
    </InformationSection>
    <InformationSection title="Address">
      <InformationItem icon={faAddressCard}>
        <address className="m-0">
          {address.street}
          <br />
          {address.city}, {address.province}
          <br />
          {address.postalCode}
        </address>
      </InformationItem>
    </InformationSection>
  </>
);

Information.propTypes = {
  phoneNumbers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired
    }).isRequired
  ),
  email: PropTypes.string,
  address: PropTypes.shape({
    street: PropTypes.string,
    city: PropTypes.string,
    province: PropTypes.string,
    postalCode: PropTypes.string
  }).isRequired
};

Information.defaultProps = {
  phoneNumbers: [],
  address: {}
};
