import React from "react";
import { Row, Col } from "react-bootstrap";

import { Page } from "components/Page";
import { GalleryTable } from "components/GalleryTable";
import { TagsDropdown } from "components/TagsDropdown";
import { Pagination } from "components/Pagination";
import { useGallery } from "./hooks";

const GalleryPage = () => {
  const {
    photos,
    tags,
    selectedTag,
    pagination,
    handleChangeTag,
    isLoading
  } = useGallery();
  return (
    <Page title="Photo Gallery" isLoading={isLoading}>
      <Row className="mb-3">
        {tags.length > 0 && (
          <>
            <Col sm={4} xs={12}>
              <TagsDropdown
                value={selectedTag}
                tags={tags}
                onChange={handleChangeTag}
              />
            </Col>
            <Col className="d-flex justify-content-end" sm={8} xs={12}>
              <Pagination {...pagination} />
            </Col>
          </>
        )}
      </Row>
      <GalleryTable photos={photos} />
    </Page>
  );
};

export default GalleryPage;
