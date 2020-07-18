import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Table } from "components/Table";
import { IconButton } from "components/IconButton";
import { Spinner } from "components/Spinner";
import { useUsersSettings } from "./hooks";

const UsersSettings = () => {
  const { isLoaded, columns, rows, handleAdd } = useUsersSettings();
  return isLoaded ? (
    <div className="mb-4">
      <Table columns={columns} rows={rows} bordered />
      <IconButton icon={faPlus} onClick={handleAdd}>
        Add user
      </IconButton>
    </div>
  ) : (
    <Spinner isCentered />
  );
};

export default UsersSettings;
