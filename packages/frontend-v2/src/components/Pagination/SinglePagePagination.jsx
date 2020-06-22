import React from "react";
import { Pagination } from "react-bootstrap";

export const SinglePagePagination = () => (
  <Pagination className="mb-0">
    <Pagination.First disabled />
    <Pagination.Prev disabled />
    <Pagination.Item active disabled>
      1
    </Pagination.Item>
    <Pagination.Next disabled />
    <Pagination.Last disabled />
  </Pagination>
);
