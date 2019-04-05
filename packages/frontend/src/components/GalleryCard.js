import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { useModal } from "react-modal-hook";
import { withStyles } from "@material-ui/core/styles";

import { getPhotoUrl } from "../utils";

const styles = {
  thumbnail: {
    height: 300,
    width: "auto"
  },
  original: {
    height: "calc(100vh - 5rem)",
    width: "100vh"
  }
};

const GalleryCard = ({ clickable, thumbnail, original, classes }) => {
  const [showModal, hideModal] = useModal(() => (
    <Dialog onClose={() => hideModal()} maxWidth="lg" open>
      <Card>
        <CardMedia
          className={classes.original}
          image={getPhotoUrl(original)}
          title={original}
        />
      </Card>
    </Dialog>
  ));
  return (
    <Card>
      {clickable && (
        <CardActionArea onClick={showModal}>
          <CardMedia
            className={classes.thumbnail}
            image={getPhotoUrl(thumbnail)}
          />
        </CardActionArea>
      )}
      {!clickable && <CardMedia component="img" src={getPhotoUrl(thumbnail)} />}
    </Card>
  );
};

GalleryCard.propTypes = {
  clickable: PropTypes.bool,
  thumbnail: PropTypes.string.isRequired,
  original: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    original: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
  }).isRequired
};

GalleryCard.defaultProps = {
  clickable: false
};

export default withStyles(styles)(GalleryCard);
