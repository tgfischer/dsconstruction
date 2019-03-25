import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import ButtonLink from "../ButtonLink";

const styles = {
  media: {
    height: 200
  }
};

const ServiceCard = ({ name, blurb, thumbnail, to, classes }) => (
  <Card>
    <CardHeader title={<Typography variant="subtitle1">{name}</Typography>} />
    <CardMedia className={classes.media} image={thumbnail} title={name} />
    <CardContent>
      <Typography>{blurb}</Typography>
    </CardContent>
    <CardActions>
      <ButtonLink to={to}>Read more</ButtonLink>
    </CardActions>
  </Card>
);

ServiceCard.propTypes = {
  name: PropTypes.string.isRequired,
  blurb: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  classes: PropTypes.shape({ media: PropTypes.string.isRequired }).isRequired
};

export default withStyles(styles)(ServiceCard);
