import express from "express";
import HttpStatus from "http-status-codes";
import asyncHandler from "express-async-handler";
import middleware from "@tomfischer/middleware";

import * as client from "../client";
import * as schemas from "../schemas/login";

const router = express.Router({ mergeParams: true });

const resetTemporaryPassword = async (req, res) => {
  const { email, password, session } = res.locals.body;
  const result = await client.resetTemporaryPassword(email, password, session);
  res.status(HttpStatus.OK).json(result);
};

router.post(
  "/temporary",
  middleware.validate.body(schemas.resetTemporaryPasswordSchema),
  asyncHandler(resetTemporaryPassword)
);

export default router;
