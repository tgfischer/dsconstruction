import React from "react";

import { useHome } from "./hooks";
import Page from "../Page";
import Masthead from "../Masthead";
import GalleryPreview from "../GalleryPreview";

const Home = () => {
  const [home] = useHome();
  return (
    <Page>
      <Masthead background={home.masthead.background} />
      <GalleryPreview />
    </Page>
  );
};

export default Home;
