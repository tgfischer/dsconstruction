import express from "express";
import HttpStatus from "http-status-codes";
import asyncHandler from "express-async-handler";
import { validate } from "@tomfischer/middleware";

import * as client from "../clients/gallery";
import * as schemas from "../schemas/gallery";

const router = express.Router({ mergeParams: true });

const get = async (req, res) => {
  const gallery = await client.get(res.locals.query);
  return res.status(HttpStatus.OK).json({ gallery });
};

const add = async (req, res) => {
  const gallery = await client.add(res.locals.body);
  return res.status(HttpStatus.OK).json({ gallery });
};

const destroy = async (req, res) => {
  const gallery = await client.destroy(res.locals.body);
  return res.status(HttpStatus.OK).json({ gallery });
};

router.get("/", validate(schemas.get, "query"), asyncHandler(get));

router.post("/add", validate(schemas.add, "body"), asyncHandler(add));

router.delete("/", validate(schemas.destroy, "body"), asyncHandler(destroy));

export default router;
