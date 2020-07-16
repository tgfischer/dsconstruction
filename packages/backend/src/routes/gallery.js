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
  await client.add(res.locals.body);
  return res.status(HttpStatus.NO_CONTENT).send();
};

const getSignedUrl = async (req, res) => {
  const result = await client.getSignedUrl();
  return res.status(HttpStatus.OK).json(result);
};

const destroy = async (req, res) => {
  await client.destroy(res.locals.body);
  return res.status(HttpStatus.OK).json({ success: true });
};

const toggle = async (req, res) => {
  const tags = await client.toggleTags(res.locals.body);
  return res.status(HttpStatus.OK).json({ tags });
};

router.get("/", validate(schemas.get, "query"), asyncHandler(get));

router.get("/url", asyncHandler(getSignedUrl));

router.put("/", validate(schemas.add, "body"), asyncHandler(add));

router.delete("/", validate(schemas.destroy, "body"), asyncHandler(destroy));

router.post("/toggle", validate(schemas.toggle, "body"), asyncHandler(toggle));

export default router;
