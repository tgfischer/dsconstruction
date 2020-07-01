import React from "react";

import { Layout } from "components/Layout";
import { Masthead } from "./Masthead";
import { About } from "./About";
import { Services } from "./Services";
import { Gallery } from "./Gallery";
import { useHomePage } from "./hooks";

export * from "./hooks";

export const HomePage = () => {
  const { masthead, about, isLoading } = useHomePage();
  return (
    <Layout isLoading={isLoading}>
      {!isLoading && (
        <>
          <Masthead {...masthead} />
          <About>{about}</About>
          <Services />
          <Gallery />
        </>
      )}
    </Layout>
  );
};
