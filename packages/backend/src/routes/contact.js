import express from "express";
import asyncHandler from "express-async-handler";
import HttpStatus from "http-status-codes";
import { validate } from "@tomfischer/middleware";

import * as client from "../clients/settings";
import * as schemas from "../schemas/contact";

const router = express.Router({ mergeParams: true });

const get = async (req, res) => {
  const contact = await client.get("contact");
  return res.status(HttpStatus.OK).json({ contact });
};

const update = async (req, res) => {
  await client.update("contact", res.locals.body);
  return res.status(HttpStatus.OK).json({ success: true });
};

router.get("/", asyncHandler(get));

router.post("/edit", validate(schemas.update, "body"), asyncHandler(update));

export default router;
