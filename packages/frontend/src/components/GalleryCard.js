import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

import useModal from "../hooks/useModal";

const GalleryCard = ({ thumbnail, original }) => {
  const { showModal } = useModal({
    content: (
      <Card>
        <CardMedia component="img" src={original} alt={original} />
      </Card>
    ),
    size: "xl"
  });
  return (
    <Card>
      <CardActionArea onClick={showModal}>
        <CardMedia component="img" src={thumbnail} />
      </CardActionArea>
    </Card>
  );
};

GalleryCard.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  original: PropTypes.string.isRequired
};

export default GalleryCard;
