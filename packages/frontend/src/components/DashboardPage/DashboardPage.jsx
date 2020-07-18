import React from "react";
import { Row, Col } from "react-bootstrap";
import { Switch, Redirect } from "react-router-dom";

import { LoggedInRoute } from "components/Routes";
import { Page } from "components/Page";
import { links } from "./constants";
import { Sidebar } from "./Sidebar";

const DashboardPage = () => (
  <Page>
    <Row>
      <Col sm={3} xs={12}>
        <Sidebar links={links} />
      </Col>
      <Col sm={9} xs={12}>
        <Switch>
          <LoggedInRoute path="/dashboard" exact>
            <Redirect to="/dashboard/home" />
          </LoggedInRoute>
          {links.map(({ displayName, url, Component }) => (
            <LoggedInRoute key={url} path={url} exact>
              <h3 className="mb-3">{displayName} Settings</h3>
              <Component />
            </LoggedInRoute>
          ))}
        </Switch>
      </Col>
    </Row>
  </Page>
);

export default DashboardPage;
