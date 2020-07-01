import React from "react";

import { Spinner } from "components/Spinner";
import { HomePageSettingsForm } from "./HomePageSettingsForm";
import { useHomePageSettings } from "./hooks";

const HomePageSettings = () => {
  const { isLoaded, ...settings } = useHomePageSettings();
  return isLoaded ? (
    <HomePageSettingsForm {...settings} />
  ) : (
    <Spinner isCentered />
  );
};

export default HomePageSettings;
