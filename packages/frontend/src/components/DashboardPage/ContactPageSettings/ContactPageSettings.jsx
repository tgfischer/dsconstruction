import React from "react";

import { Spinner } from "components/Spinner";
import { PhoneNumbersTable } from "./PhoneNumbersTable";
import { ContactPageSettingsForm } from "./ContactPageSettingsForm";
import { useContactPageSettings } from "./hooks";

const ContactPageSettings = () => {
  const {
    isLoaded,
    phoneNumbers,
    fetchContact,
    ...settings
  } = useContactPageSettings();
  return isLoaded ? (
    <>
      <PhoneNumbersTable
        phoneNumbers={phoneNumbers}
        fetchContact={fetchContact}
      />
      <ContactPageSettingsForm {...settings} />
    </>
  ) : (
    <Spinner isCentered />
  );
};

export default ContactPageSettings;
