import React from "react";
import PropTypes from "prop-types";

import { SinglePagePagination } from "./SinglePagePagination";
import { MultiplePagePagination } from "./MultiplePagePagination";

export const Pagination = ({ totalCount, ...props }) =>
  totalCount === 1 ? (
    <SinglePagePagination />
  ) : (
    <MultiplePagePagination {...props} totalCount={totalCount} />
  );

Pagination.propTypes = {
  totalCount: PropTypes.number
};
