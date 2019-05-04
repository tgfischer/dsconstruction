import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";

import { getPhotoUrl } from "../utils";
import useModal from "../hooks/useModal";

const styles = theme => ({
  thumbnail: {
    height: 300,
    width: "auto"
  },
  original: {
    maxHeight: `calc(100vh - ${theme.spacing.unit}px)`,
    maxWidth: "100%",
    width: "auto"
  },
  icon: {
    fill: "currentColor",
    width: "1em",
    height: "1em",
    display: "inline-block",
    fontSize: "24px",
    transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    userSelect: "none",
    flexShrink: "0",
    color: theme.palette.primary.main
  },
  footer: {
    padding: 0,
    paddingBottom: "0px !important"
  }
});

const GalleryCard = ({ photo, onClick, classes, footer: Footer }) => {
  const [showModal, hideModal] = useModal(src => () => (
    <Dialog onClose={() => hideModal()} maxWidth="lg" open>
      <Card>
        <CardMedia
          className={classes.original}
          component="img"
          src={getPhotoUrl(src)}
          alt={src}
        />
      </Card>
    </Dialog>
  ));
  return (
    <Card>
      <CardActionArea
        onClick={
          onClick ? () => onClick(photo) : () => showModal(photo.original)
        }
      >
        <CardMedia
          className={classes.thumbnail}
          image={getPhotoUrl(photo.thumbnail)}
        >
          <Grid spacing={8} container>
            {photo.isSelected && (
              <Grid xs={12} item>
                <svg
                  className={classes.icon}
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                >
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path d="M5 19h14V5H5v14zm2.41-7.4l2.58 2.58 6.59-6.59L17.99 9l-8 8L6 13.01l1.41-1.41z" />
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
                  <path
                    d="M17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z"
                    fill="white"
                  />
                </svg>
              </Grid>
            )}
          </Grid>
        </CardMedia>
      </CardActionArea>
      {Footer && (
        <CardContent className={classes.footer}>
          <Footer photo={photo} />
        </CardContent>
      )}
    </Card>
  );
};

GalleryCard.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    original: PropTypes.string.isRequired,
    isSelected: PropTypes.bool
  }).isRequired,
  onClick: PropTypes.func,
  footer: PropTypes.func,
  classes: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    original: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    footer: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(GalleryCard);
