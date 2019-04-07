import express from "express";
import HttpStatus from "http-status-codes";
import asyncHandler from "express-async-handler";
import { validate } from "@tomfischer/middleware";

import * as client from "../clients/tags";
import * as schemas from "../schemas/tags";

const router = express.Router({ mergeParams: true });

const getAll = async (req, res) => {
  const tags = await client.getAll();
  return res.status(HttpStatus.OK).json({ tags });
};

const add = async (req, res) => {
  const tags = await client.add(res.locals.body);
  return res.status(HttpStatus.OK).json({ tags });
};

const destroy = async (req, res) => {
  const tags = await client.destroy(res.locals.body);
  return res.status(HttpStatus.OK).json({ tags });
};

router.get("/", asyncHandler(getAll));

router.post("/", validate(schemas.add, "body"), asyncHandler(add));

router.delete("/", validate(schemas.destroy, "body"), asyncHandler(destroy));

export default router;
