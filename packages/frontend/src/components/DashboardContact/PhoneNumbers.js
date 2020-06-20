import React from "react";
import PropTypes from "prop-types";
import MuiDataTable from "mui-datatables";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";

import { usePhoneNumbers } from "./hooks";

const styles = theme => ({
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
});

const PhoneNumbers = ({ classes }) => {
  const [phoneNumbers, showModal, deleteRow, isLoading] = usePhoneNumbers();
  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <Button
          onClick={showModal}
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          <AddIcon className={classes.buttonIcon} />
          Add phone number
        </Button>
      </Grid>
      <Grid xs={12} item>
        <MuiDataTable
          title="Edit phone numbers"
          data={phoneNumbers}
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
              name: "number",
              label: "Phone Number"
            }
          ]}
          options={{
            print: false,
            download: false,
            viewColumns: false,
            rowHover: false,
            onRowsDelete: deleteRow,
            responsive: "scroll"
          }}
        />
      </Grid>
    </Grid>
  );
};

PhoneNumbers.propTypes = {
  classes: PropTypes.shape({
    buttonIcon: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(PhoneNumbers);
