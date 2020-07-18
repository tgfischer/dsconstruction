import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Table } from "components/Table";
import { IconButton } from "components/IconButton";
import { Spinner } from "components/Spinner";
import { useServicesSettings } from "./hooks";

const ServicesSettings = () => {
  const { isLoaded, columns, rows, handleAdd } = useServicesSettings();
  return isLoaded ? (
    <div className="mb-4">
      <Table columns={columns} rows={rows} bordered />
      <IconButton icon={faPlus} onClick={handleAdd}>
        Add service
      </IconButton>
    </div>
  ) : (
    <Spinner isCentered />
  );
};

export default ServicesSettings;
