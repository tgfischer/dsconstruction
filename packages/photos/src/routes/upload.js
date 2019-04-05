import express from "express";
import HttpStatus from "http-status-codes";
import asyncHandler from "express-async-handler";
import { validate } from "@tomfischer/middleware";

import * as client from "../client";
import * as schemas from "../schemas/upload";

const router = express.Router({ mergeParams: true });

const getSignedUrl = async (req, res) => {
  const { files } = res.locals.body;
  const data = await client.getSignedUrl(files);
  res.status(HttpStatus.OK).json({ data });
};

router.post(
  "/",
  validate(schemas.uploadSchema, "body"),
  asyncHandler(getSignedUrl)
);

export default router;
