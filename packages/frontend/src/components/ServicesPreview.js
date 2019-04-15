import React from "react";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import BuildIcon from "@material-ui/icons/Build";
import sortBy from "lodash/sortBy";

import Preview from "./Preview";
import useServices from "../hooks/useServices";

const ServicesPreview = () => {
  const [services, isLoading] = useServices();
  return (
    <Preview title="Services" isLoading={isLoading}>
      <Grid spacing={16} justify="center" container>
        {sortBy(services, ["name"]).map(({ name, blurb, thumbnail, to }) => (
          <Chip
            style={{ margin: 10 }}
            label={name}
            avatar={
              <Avatar>
                <BuildIcon />
              </Avatar>
            }
          />
        ))}
      </Grid>
    </Preview>
  );
  /* return (
    <Preview title="Services" isLoading={isLoading}>
      {sortBy(services, ["name"]).map(({ name, blurb, thumbnail, to }) => (
        <Chip style={{ margin: 5 }} label={name} icon={<BuildIcon />} />
      ))}
    </Preview>
  ); */
};

export default ServicesPreview;
