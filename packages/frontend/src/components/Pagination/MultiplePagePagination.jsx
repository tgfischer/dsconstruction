import React from "react";
import PropTypes from "prop-types";
import { Pagination } from "react-bootstrap";
import { range } from "lodash";

export const MultiplePagePagination = ({
  currentPage,
  totalCount,
  onChange
}) => (
  <Pagination className="mb-0">
    <Pagination.First onClick={onChange(0)} disabled={currentPage === 0} />
    <Pagination.Prev
      onClick={onChange(currentPage - 1)}
      disabled={currentPage === 0}
    />
    {range(
      Math.max(0, currentPage - 2),
      Math.min(totalCount, currentPage + 3)
    ).map(pageNumber => (
      <Pagination.Item
        key={pageNumber}
        active={currentPage === pageNumber}
        onClick={onChange(pageNumber)}
      >
        {pageNumber + 1}
      </Pagination.Item>
    ))}
    <Pagination.Next
      onClick={onChange(currentPage + 1)}
      disabled={currentPage === totalCount - 1}
    />
    <Pagination.Last
      onClick={onChange(totalCount - 1)}
      disabled={currentPage === totalCount - 1}
    />
  </Pagination>
);

MultiplePagePagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};
