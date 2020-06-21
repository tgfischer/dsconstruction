import React from "react";

import { Page } from "components/Page";
import { Masthead } from "./Masthead";
import { useHome } from "./hooks";

const HomePage = () => {
  const { data, isLoading } = useHome();
  return (
    <Page title="foo bar" isLoading={isLoading}>
      {!isLoading && <Masthead {...data?.masthead} />}
    </Page>
  );
};

export default HomePage;
