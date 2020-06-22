import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { GalleryTable } from "components/GalleryTable";
import { Section } from "./Section";
import { useGallery } from "./hooks";

export const Gallery = () => {
  const { photos } = useGallery();
  return (
    <Section
      title="Photo Gallery"
      action={() => (
        <Button as={Link} to="/gallery" variant="link">
          View Photos <FontAwesomeIcon className="ml-1" icon={faArrowRight} />
        </Button>
      )}
    >
      <GalleryTable photos={photos} />
    </Section>
  );
};
