import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { useModal } from "react-modal-hook";

const GalleryCard = ({ thumbnail, original }) => {
  const [showModal, hideModal] = useModal(() => (
    <Dialog onClose={() => hideModal()} maxWidth="lg" open>
      <Card>
        <CardMedia component="img" src={original} alt={original} />
      </Card>
    </Dialog>
  ));
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
