import React from "react";
import TablePagination from "@material-ui/core/TablePagination";
import Grid from "@material-ui/core/Grid";

import GalleryCards from "./GalleryCards";
import useGallery from "../hooks/useGallery";
import LoadingSpinner from "./LoadingSpinner";
import TagsSelect from "./TagsSelect";

const GalleryTable = props => {
  const {
    photos,
    tags,
    selectedTags,
    count,
    page,
    size,
    handleGetPage,
    handleSelectTag,
    isLoading
  } = useGallery();
  return (
    <Grid spacing={16} container>
      {isLoading && (
        <Grid xs={12} item>
          <LoadingSpinner padding={3} />
        </Grid>
      )}
      {!isLoading && (
        <Grid xs={12} item>
          <TagsSelect
            tags={tags}
            selectedTags={selectedTags}
            handleSelectTag={handleSelectTag}
          />
          <TablePagination
            component="div"
            onChangePage={handleGetPage}
            count={count || 0}
            page={page || 0}
            rowsPerPage={size}
            rowsPerPageOptions={[12]}
          />
          <GalleryCards photos={photos} {...props} />
        </Grid>
      )}
    </Grid>
  );
};

export default GalleryTable;
