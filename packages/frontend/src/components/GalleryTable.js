import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TablePagination, Grid } from "@material-ui/core";

import GalleryCards from "./GalleryCards";
import useGallery from "../hooks/useGallery";
import LoadingSpinner from "./LoadingSpinner";
import TagsSelect from "./TagsSelect";

const StyledGrid = styled(Grid)`
  padding-bottom: 3em;
`;

const Pagination = ({ handleGetPage, count, page, size }) => (
  <TablePagination
    component="div"
    onChangePage={handleGetPage}
    count={count || 0}
    page={page || 0}
    rowsPerPage={size}
    rowsPerPageOptions={[12]}
  />
);

Pagination.propTypes = {
  handleGetPage: PropTypes.func.isRequired,
  count: PropTypes.number,
  page: PropTypes.number,
  size: PropTypes.number.isRequired
};

Pagination.defaultProps = {
  count: 0,
  page: 0
};

const GalleryTable = props => {
  const {
    photos,
    tags,
    selectedTag,
    handleSelectTag,
    isLoading,
    ...gallery
  } = useGallery();
  return (
    <StyledGrid spacing={2} container>
      {isLoading && (
        <Grid xs={12} item>
          <LoadingSpinner padding={3} />
        </Grid>
      )}
      {!isLoading && (
        <Grid xs={12} item>
          <TagsSelect
            tags={tags}
            selectedTag={selectedTag}
            handleSelectTag={handleSelectTag}
          />
          <Pagination {...gallery} />
          <GalleryCards photos={photos} {...props} />
          <Pagination {...gallery} />
        </Grid>
      )}
    </StyledGrid>
  );
};

export default GalleryTable;
