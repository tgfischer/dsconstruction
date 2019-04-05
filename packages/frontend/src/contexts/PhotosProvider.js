import React, { useState } from "react";
import PropTypes from "prop-types";

export const PhotosContext = React.createContext();

const PhotosProvider = ({ children }) => (
  <PhotosContext.Provider value={useState({ files: [] })}>
    {children}
  </PhotosContext.Provider>
);

PhotosProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default PhotosProvider;
