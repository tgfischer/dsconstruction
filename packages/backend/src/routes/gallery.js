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
  const url = await client.add();
  return res.redirect(url);
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
  const url = await client.getSignedUrl(res.locals.body);
  return res.redirect(url);
};

router.get("/", validate(schemas.get, "query"), asyncHandler(get));

router.put("/", asyncHandler(add));

router.delete("/", validate(schemas.destroy, "body"), asyncHandler(destroy));

router.post("/toggle", validate(schemas.toggle, "body"), asyncHandler(toggle));

router.post("/url", asyncHandler(getSignedUrl));

export default router;
