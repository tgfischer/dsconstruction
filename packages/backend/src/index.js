import express from "express";
import serverless from "serverless-http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import middleware from "@tomfischer/middleware";

import home from "./routes/home";
import services from "./routes/services";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/home", home);
app.use("/api/services", services);
app.use(middleware.errorHandler);

export const handler = serverless(app);
