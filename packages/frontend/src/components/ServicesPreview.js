import React from "react";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import BuildIcon from "@material-ui/icons/Build";
import sortBy from "lodash/sortBy";

import Preview from "./Preview";
import useServices from "../hooks/useServices";

const ServicesPreview = () => {
  const [services, isLoading] = useServices();
  return (
    <Preview title="Services" isLoading={isLoading}>
      <Grid spacing={16} container>
        {sortBy(services, ["name"]).map(({ name, blurb, thumbnail, to }) => (
          <Grid key={name} sm={3} xs={6} item>
            <Chip label={name} icon={<BuildIcon />} variant="outlined" />
          </Grid>
        ))}
      </Grid>
    </Preview>
  );
};

export default ServicesPreview;
