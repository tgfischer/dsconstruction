import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Table } from "components/Table";
import { IconButton } from "components/IconButton";
import { usePhoneNumbersTable } from "./hooks";

export const PhoneNumbersTable = props => {
  const { columns, rows, handleAdd } = usePhoneNumbersTable(props);
  return (
    <div className="mb-4">
      <Table columns={columns} rows={rows} bordered />
      <IconButton icon={faPlus} onClick={handleAdd}>
        Add phone number
      </IconButton>
    </div>
  );
};
