import React from "react";

import { Layout } from "components/Layout";
import { Masthead } from "./Masthead";
import { About } from "./About";
import { Services } from "./Services";
import { Gallery } from "./Gallery";
import { useHome } from "./hooks";

const HomePage = () => {
  const { masthead, about, isLoading } = useHome();
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

export default HomePage;
