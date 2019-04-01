import express from "express";
import HttpStatus from "http-status-codes";
import asyncHandler from "express-async-handler";
import { validate } from "@tomfischer/middleware";

import * as client from "../clients/services";
import * as schemas from "../schemas/services";

const router = express.Router({ mergeParams: true });

const getAll = async (req, res) => {
  const services = await client.getAll();
  return res.status(HttpStatus.OK).json({ services });
};

const add = async (req, res) => {
  const services = await client.add(res.locals.body);
  return res.status(HttpStatus.OK).json({ services });
};

const edit = async (req, res) => {
  const services = await client.edit(res.locals.body);
  return res.status(HttpStatus.OK).json({ services });
};

const destroy = async (req, res) => {
  const services = await client.destroy(res.locals.body);
  return res.status(HttpStatus.OK).json({ services });
};

router.get("/", asyncHandler(getAll));

router.post("/add", validate(schemas.add, "body"), asyncHandler(add));

router.post("/edit", validate(schemas.edit, "body"), asyncHandler(edit));

router.delete("/", validate(schemas.destroy, "body"), asyncHandler(destroy));

export default router;
