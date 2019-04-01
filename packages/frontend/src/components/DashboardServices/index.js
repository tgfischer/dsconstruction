import React from "react";
import PropTypes from "prop-types";
import MuiDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

import Dashboard from "../Dashboard";
import { useDashboardServices } from "./hooks";

const styles = theme => ({
  buttonIcon: {
    marginRight: theme.spacing.unit
  }
});

const DashboardServices = ({ classes }) => {
  const [
    services,
    showAddModal,
    showEditModal,
    deleteRows,
    isLoading
  ] = useDashboardServices();
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
            Add Service
          </Button>
        </Grid>
        <Grid xs={12} item>
          <MuiDataTable
            title="Services"
            data={services}
            columns={[
              {
                name: "id",
                options: {
                  display: false
                }
              },
              {
                name: "name",
                label: "Name"
              },
              {
                name: "blurb",
                label: "Brief description"
              },
              {
                name: "description",
                options: {
                  display: false
                }
              },
              {
                name: "thumbnail",
                options: {
                  display: false
                }
              },
              {
                name: "to",
                options: {
                  display: false
                }
              }
            ]}
            options={{
              print: false,
              download: false,
              viewColumns: false,
              responsive: "scroll",
              onRowClick: showEditModal,
              onRowsDelete: deleteRows
            }}
          />
        </Grid>
      </Grid>
    </Dashboard>
  );
};

DashboardServices.propTypes = {
  classes: PropTypes.shape({
    buttonIcon: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(DashboardServices);
