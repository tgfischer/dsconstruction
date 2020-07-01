import React from "react";
import PropTypes from "prop-types";
import { Table as BootstrapTable } from "react-bootstrap";

export const Table = ({ columns, rows, ...props }) => (
  <BootstrapTable {...props}>
    <thead>
      <tr>
        {Object.keys(columns).map(accessor => {
          const { Header } = columns[accessor];
          return (
            Header && (
              <th key={accessor}>
                <Header />
              </th>
            )
          );
        })}
      </tr>
    </thead>
    <tbody>
      {rows.map(row => (
        <tr>
          {Object.keys(columns).map(accessor => {
            const { Cell, cellProps = {} } = columns[accessor];
            return (
              <td key={accessor} {...cellProps}>
                <Cell {...row} />
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </BootstrapTable>
);

Table.propTypes = {
  columns: PropTypes.object.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};
