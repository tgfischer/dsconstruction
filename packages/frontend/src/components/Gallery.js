import React from "react";

import GalleryProvider from "../contexts/GalleryProvider";
import Page from "./Page";
import GalleryTable from "./GalleryTable";

const GalleryPage = () => (
  <Page fixed>
    <GalleryProvider initialState={{}}>
      <GalleryTable />
    </GalleryProvider>
  </Page>
);

export default GalleryPage;
