import React from "react";
import PropTypes from "prop-types";
import MuiDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import Dashboard from "../Dashboard";
import GalleryCard from "../GalleryCard";
import { useDashboardGallery } from "./hooks";

const styles = theme => ({
  buttonIcon: {
    marginRight: theme.spacing.unit
  },
  spinner: {
    marginLeft: theme.spacing.unit
  }
});

const Container = styled.div`
  max-width: 250px;
`;

const DashboardGallery = ({ classes }) => {
  const [photos, showAddModal, deleteRows, isLoading] = useDashboardGallery();
  return (
    <Dashboard>
      <Grid spacing={24} container>
        <Grid xs={12} item>
          <Button
            onClick={showAddModal}
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            <AddIcon className={classes.buttonIcon} />
            Add Photos
          </Button>
        </Grid>
        <Grid xs={12} item>
          <MuiDataTable
            title="Photo Gallery"
            data={photos}
            columns={[
              {
                name: "id",
                options: {
                  display: false
                }
              },
              {
                name: "thumbnail",
                label: "Photo",
                options: {
                  customBodyRender: thumbnail => (
                    <Container>
                      <GalleryCard thumbnail={thumbnail} original={thumbnail} />
                    </Container>
                  )
                }
              },
              {
                name: "original",
                options: {
                  display: false
                }
              }
            ]}
            options={{
              print: false,
              download: false,
              viewColumns: false,
              onRowsDelete: deleteRows
            }}
          />
        </Grid>
      </Grid>
    </Dashboard>
  );
};

DashboardGallery.propTypes = {
  classes: PropTypes.shape({
    buttonIcon: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(DashboardGallery);
