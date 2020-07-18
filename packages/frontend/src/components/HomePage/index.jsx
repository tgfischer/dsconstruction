import React from "react";

import { Layout } from "components/Layout";
import { Masthead } from "./Masthead";
import { About } from "./About";
import { Services } from "./Services";
import { Gallery } from "./Gallery";
import { useHomePage } from "./hooks";

export * from "./hooks";

export const HomePage = () => {
  const { masthead, about, services, isLoaded } = useHomePage();
  return (
    <Layout isLoading={!isLoaded}>
      {isLoaded && (
        <>
          <Masthead {...masthead} />
          <About>{about}</About>
          <Services {...services} />
          <Gallery />
        </>
      )}
    </Layout>
  );
};
