import React from "react";
import PropTypes from "prop-types";

const getStyles = ({ background }) => ({
  background: {
    background: background
      ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${background}) no-repeat center center fixed`
      : undefined,
    backgroundSize: "cover",
    height: "400px"
  }
});

const Masthead = ({ background }) => {
  const styles = getStyles({ background });
  return <div style={styles.background} />;
};

Masthead.propTypes = {
  background: PropTypes.string
};

export default Masthead;
