import React from "react";

import { useHome } from "./hooks";
import CoreLayout from "../CoreLayout";
import Masthead from "../Masthead";
import GalleryPreview from "../GalleryPreview";
import ServicesPreview from "../ServicesPreview";

const Home = () => {
  const [home] = useHome();
  return (
    <CoreLayout>
      <Masthead background={home.masthead.background} />
      <ServicesPreview />
      <GalleryPreview />
    </CoreLayout>
  );
};

export default Home;
