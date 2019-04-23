import React from "react";
import PropTypes from "prop-types";
import MuiDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

import Dashboard from "../Dashboard";
import { useDashboardUsers } from "./hooks";

const styles = theme => ({
  buttonIcon: {
    marginRight: theme.spacing.unit
  }
});

const DashboardUsers = ({ classes }) => {
  const [users, showAddModal, deleteRows, isLoading] = useDashboardUsers();
  return (
    <Dashboard title="Manage users" isLoading={isLoading}>
      <Grid spacing={24} container>
        <Grid xs={12} item>
          <Button
            onClick={showAddModal}
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            <AddIcon className={classes.buttonIcon} />
            Add user
          </Button>
        </Grid>
        <Grid xs={12} item>
          <MuiDataTable
            title="Users"
            data={users}
            columns={[
              {
                name: "id",
                options: {
                  display: false
                }
              },
              {
                name: "firstName",
                options: {
                  display: false
                }
              },
              {
                name: "lastName",
                options: {
                  display: false
                }
              },
              {
                name: "name",
                label: "Name",
                options: {
                  customBodyRender: (_, { rowData }) => {
                    if (!rowData || !rowData.length) {
                      return;
                    }
                    return `${rowData[1]} ${rowData[2]}`;
                  }
                }
              },
              {
                name: "email",
                label: "Email"
              },
              {
                name: "status",
                label: "Account status"
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

DashboardUsers.propTypes = {
  classes: PropTypes.shape({
    buttonIcon: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(DashboardUsers);
