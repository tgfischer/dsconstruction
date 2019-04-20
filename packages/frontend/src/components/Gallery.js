import React from "react";

import GalleryProvider from "../contexts/GalleryProvider";
import Page from "./Page";
import GalleryTable from "./GalleryTable";

const GalleryPage = () => (
  <GalleryProvider initialState={{}}>
    <Page title="D's Construction - Gallery" header="Photo Gallery" fixed>
      <GalleryTable />
    </Page>
  </GalleryProvider>
);

export default GalleryPage;
