import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import defaults from "lodash/defaults";

import { useFetchGallery } from "../hooks/useGallery";

export const GalleryContext = React.createContext();

const Provider = ({ children }) => {
  useFetchGallery();
  return <Fragment>{children}</Fragment>;
};

Provider.propTypes = {
  children: PropTypes.node.isRequired
};

const GalleryProvider = ({ children, initialState }) => (
  <GalleryContext.Provider
    value={useState(
      defaults(initialState, {
        page: 0,
        tags: [],
        selectedTags: null,
        photos: [],
        size: 12
      })
    )}
  >
    <Provider>{children}</Provider>
  </GalleryContext.Provider>
);

GalleryProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialState: PropTypes.shape({
    page: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired)
  }).isRequired
};

export default GalleryProvider;
