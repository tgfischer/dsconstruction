import React from "react";
import Grid from "@material-ui/core/Grid";

import Preview from "./Preview";
import ServiceCard from "./ServiceCard";
import useServices from "../hooks/useServices";

const ServicesPreview = () => {
  const [services, isLoading] = useServices();
  return (
    <Preview title="Services" isLoading={isLoading}>
      <Grid spacing={16} container>
        {services.map(({ name, blurb, thumbnail, to }) => (
          <Grid key={name} sm={4} xs={12} item>
            <ServiceCard
              name={name}
              blurb={blurb}
              thumbnail={thumbnail}
              to={to}
            />
          </Grid>
        ))}
      </Grid>
    </Preview>
  );
};

export default ServicesPreview;
