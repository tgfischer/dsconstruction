import express from "express";
import asyncHandler from "express-async-handler";
import HttpStatus from "http-status-codes";
import { validate } from "@tomfischer/middleware";

import * as client from "../clients/home";
import * as schemas from "../schemas/home";

const router = express.Router({ mergeParams: true });

const get = async (req, res) => {
  const home = await client.get();
  return res.status(HttpStatus.OK).json({ home });
};

const update = async (req, res) => {
  await client.update(res.locals.body);
  return res.status(HttpStatus.OK).json({ success: true });
};

router.get("/", asyncHandler(get));

router.post("/", validate(schemas.update, "body"), asyncHandler(update));

export default router;
