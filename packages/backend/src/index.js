import express from "express";
import serverless from "serverless-http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import middleware from "@tomfischer/middleware";

import home from "./routes/home";
import gallery from "./routes/gallery";
import tags from "./routes/tags";
import services from "./routes/services";
import contact from "./routes/contact";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/home", home);
app.use("/api/gallery", gallery);
app.use("/api/gallery/tags", tags);
app.use("/api/services", services);
app.use("/api/contact", contact);

app.use(middleware.errorHandler);

export const handler = serverless(app);
