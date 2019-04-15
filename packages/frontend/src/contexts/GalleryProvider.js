import React, { useState } from "react";
import PropTypes from "prop-types";
import defaults from "lodash/defaults";

export const GalleryContext = React.createContext();

const GalleryProvider = ({ children, initialState }) => (
  <GalleryContext.Provider
    value={useState(
      defaults(initialState, {
        page: 0,
        tags: [],
        selectedTags: [],
        photos: [],
        size: 12
      })
    )}
  >
    {children}
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
