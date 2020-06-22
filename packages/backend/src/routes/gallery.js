import express from "express";
import HttpStatus from "http-status-codes";
import asyncHandler from "express-async-handler";
import { validate } from "@tomfischer/middleware";

import * as client from "../clients/gallery";
import * as schemas from "../schemas/gallery";

const router = express.Router({ mergeParams: true });

const get = async (req, res) => {
  const gallery = await client.get(res.locals.query);
  return res.status(HttpStatus.OK).json(gallery);
};

const add = async (req, res) => {
  const gallery = await client.add(res.locals.body);
  return res.status(HttpStatus.OK).json({ gallery });
};

const destroy = async (req, res) => {
  await client.destroy(res.locals.body);
  return res.status(HttpStatus.OK).json({ success: true });
};

const toggle = async (req, res) => {
  const tags = await client.toggleTags(res.locals.body);
  return res.status(HttpStatus.OK).json({ tags });
};

const getSignedUrl = async (req, res) => {
  const { files } = res.locals.body;
  const data = await client.getSignedUrl(files);
  res.status(HttpStatus.OK).json({ data });
};

router.get("/", validate(schemas.get, "query"), asyncHandler(get));

router.post("/", validate(schemas.add, "body"), asyncHandler(add));

router.delete("/", validate(schemas.destroy, "body"), asyncHandler(destroy));

router.post("/toggle", validate(schemas.toggle, "body"), asyncHandler(toggle));

router.post(
  "/url",
  validate(schemas.urlSchema, "body"),
  asyncHandler(getSignedUrl)
);

export default router;
