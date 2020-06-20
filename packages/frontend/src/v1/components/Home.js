import React from "react";

import useHome from "../hooks/useHome";
import CoreLayout from "./CoreLayout";
import Masthead from "./Masthead";
import About from "./About";
import GalleryPreview from "./GalleryPreview";
import ServicesPreview from "./ServicesPreview";
import LoadingSpinner from "./LoadingSpinner";
import HomeProvider from "../contexts/HomeProvider";

const Home = () => {
  const [{ masthead, about, services, photos, isLoading }] = useHome();
  return isLoading ? (
    <LoadingSpinner fullHeight />
  ) : (
    <CoreLayout title="D's Construction - Home">
      <Masthead masthead={masthead} />
      <About about={about} />
      <ServicesPreview services={services} />
      <GalleryPreview photos={photos} />
    </CoreLayout>
  );
};

const Wrapper = () => (
  <HomeProvider>
    <Home />
  </HomeProvider>
);

export default Wrapper;
