import React from "react";
import PropTypes from "prop-types";
import {
  faInbox,
  faPhoneAlt,
  faAddressCard
} from "@fortawesome/free-solid-svg-icons";

import { InformationItem } from "./InformationItem";

export const Information = ({ phoneNumbers, email, address }) => (
  <>
    <div className="mb-4">
      <h6>Phone numbers</h6>
      {phoneNumbers.map(({ name, number }) => (
        <InformationItem icon={faPhoneAlt}>
          <p className="m-0">{number}</p>
          <p className="m-0 text-muted">{name}</p>
        </InformationItem>
      ))}
    </div>
    <div className="mb-4">
      <h6>Email</h6>
      <InformationItem icon={faInbox}>
        <p className="m-0">{email}</p>
      </InformationItem>
    </div>
    <div className="mb-4">
      <h6>Address</h6>
      <InformationItem icon={faAddressCard}>
        <address className="m-0">
          {address.street}
          <br />
          {address.city}, {address.province}
          <br />
          {address.postalCode}
        </address>
      </InformationItem>
    </div>
  </>
);

Information.propTypes = {
  phoneNumbers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  email: PropTypes.string,
  address: PropTypes.shape({
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired
  }).isRequired
};

Information.defaultProps = {
  phoneNumbers: [],
  address: {}
};
