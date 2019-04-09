import React from "react";
import TablePagination from "@material-ui/core/TablePagination";
import Grid from "@material-ui/core/Grid";

import GalleryCards from "./GalleryCards";
import useGallery from "../hooks/useGallery";
import LoadingSpinner from "./LoadingSpinner";

const GalleryTable = props => {
  const { photos, count, page, size, handleGetPage, isLoading } = useGallery();
  return (
    <Grid spacing={16} container>
      {isLoading && (
        <Grid xs={12} item>
          <LoadingSpinner padding={3} />
        </Grid>
      )}
      {!isLoading && (
        <Grid xs={12} item>
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
